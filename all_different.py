from collections import deque
from typing import Any

class Variable:
    """
    Represents a CSP Variable with a name and a domain of integer values.
    """
    name: str
    domain: list[int]

    def __init__(self, name: str, domain: list[int]):
        self.name = name
        self.domain = list(domain)

    def __repr__(self) -> str:
        return f"Variable({self.name}, {self.domain})"


def max_bipartite_matching(variables: list[Variable]) -> tuple[dict[str, int], dict[int, str]]:
    """
    Computes a maximum bipartite matching between variables and values.
    Returns:
        matching: dict mapping variable name to matched value.
        reverse_matching: dict mapping value to matched variable name.
    """
    matching: dict[str, int] = {}
    reverse_matching: dict[int, str] = {}

    # Sort variables and domains to ensure deterministic execution
    variables_sorted = sorted(variables, key=lambda v: v.name)
    domains_map = {v.name: sorted(v.domain) for v in variables_sorted}

    def dfs(var_name: str, visited_vals: set[int]) -> bool:
        for val in domains_map[var_name]:
            if val in visited_vals:
                continue
            visited_vals.add(val)
            # If val is unmatched, or we can find an augmenting path
            if val not in reverse_matching or dfs(reverse_matching[val], visited_vals):
                matching[var_name] = val
                reverse_matching[val] = var_name
                return True
        return False

    for v in variables_sorted:
        visited_vals: set[int] = set()
        dfs(v.name, visited_vals)

    return matching, reverse_matching


def compute_sccs(nodes: list[str], edges: dict[str, list[str]]) -> list[list[str]]:
    """
    Computes Strongly Connected Components (SCCs) using Tarjan's algorithm.
    """
    index: int = 0
    stack: list[str] = []
    indices: dict[str, int] = {}
    lowlinks: dict[str, int] = {}
    on_stack: set[str] = set()
    sccs: list[list[str]] = []

    def strongconnect(node: str) -> None:
        nonlocal index
        indices[node] = index
        lowlinks[node] = index
        index += 1
        stack.append(node)
        on_stack.add(node)

        for neighbor in edges.get(node, []):
            if neighbor not in indices:
                strongconnect(neighbor)
                lowlinks[node] = min(lowlinks[node], lowlinks[neighbor])
            elif neighbor in on_stack:
                lowlinks[node] = min(lowlinks[node], indices[neighbor])

        if lowlinks[node] == indices[node]:
            scc: list[str] = []
            while True:
                w = stack.pop()
                on_stack.remove(w)
                scc.append(w)
                if w == node:
                    break
            sccs.append(scc)

    for node in nodes:
        if node not in indices:
            strongconnect(node)

    return sccs


def run_regin_filter(variables: list[Variable]) -> tuple[bool, dict[str, list[int]], dict[str, Any]]:
    """
    Runs Regin's global filtering algorithm for the AllDifferent constraint.
    
    Returns:
        satisfiable: bool indicating if a complete matching matching all variables exists.
        pruned_domains: dict mapping variable name to its pruned domain of values.
        debug_data: dict containing details about matching, residual edges, SCCs, and reachability.
    """
    # 1. Compute Maximum Matching
    matching, reverse_matching = max_bipartite_matching(variables)
    
    num_vars = len(variables)
    satisfiable = (len(matching) == num_vars)
    
    # Extract unique values across all domains
    all_values = set()
    for v in variables:
        all_values.update(v.domain)
    
    # Node names for graph processing to avoid collision:
    # "var_<name>" for variables, "val_<value>" for values
    var_nodes = [f"var_{v.name}" for v in variables]
    val_nodes = [f"val_{val}" for val in all_values]
    all_nodes = var_nodes + val_nodes

    # 2. Construct Directed Residual Graph (G_R)
    # Matching edges: val -> var
    # Non-matching edges: var -> val
    edges_gr: dict[str, list[str]] = {node: [] for node in all_nodes}
    for v in variables:
        var_node = f"var_{v.name}"
        matched_val = matching.get(v.name)
        for val in v.domain:
            val_node = f"val_{val}"
            if matched_val == val:
                edges_gr[val_node].append(var_node)
            else:
                edges_gr[var_node].append(val_node)

    # 3. Compute SCCs on G_R
    sccs = compute_sccs(all_nodes, edges_gr)
    node_to_scc_idx = {}
    for idx, scc in enumerate(sccs):
        for node in scc:
            node_to_scc_idx[node] = idx

    # 4. Compute Alternating Paths from Unmatched Values
    # We do a reachability search in the reversed residual graph G_R^T starting from unmatched value nodes
    edges_gr_transposed: dict[str, list[str]] = {node: [] for node in all_nodes}
    for u, neighbors in edges_gr.items():
        for v in neighbors:
            edges_gr_transposed[v].append(u)

    # Unmatched value nodes (nodes in val_nodes not in reverse_matching)
    unmatched_val_nodes = [f"val_{val}" for val in all_values if val not in reverse_matching]
    
    reachable_from_unmatched: set[str] = set()
    queue: deque[str] = deque(unmatched_val_nodes)
    for node in unmatched_val_nodes:
        reachable_from_unmatched.add(node)
        
    while queue:
        curr = queue.popleft()
        for neighbor in edges_gr_transposed.get(curr, []):
            if neighbor not in reachable_from_unmatched:
                reachable_from_unmatched.add(neighbor)
                queue.append(neighbor)

    # 5. Pruning / Filtering
    # An edge (x, y) is valid if:
    #   - it is a matching edge, OR
    #   - its endpoints belong to the same SCC, OR
    #   - both of its endpoints are reachable from an unmatched value in G_R^T
    pruned_domains: dict[str, list[int]] = {}
    removed_edges: list[tuple[str, int]] = []
    
    for v in variables:
        var_node = f"var_{v.name}"
        new_domain = []
        matched_val = matching.get(v.name)
        
        for val in v.domain:
            val_node = f"val_{val}"
            
            is_matching = (matched_val == val)
            same_scc = (node_to_scc_idx[var_node] == node_to_scc_idx[val_node])
            on_alt_path = (var_node in reachable_from_unmatched and val_node in reachable_from_unmatched)
            
            if is_matching or same_scc or on_alt_path:
                new_domain.append(val)
            else:
                removed_edges.append((v.name, val))
                
        pruned_domains[v.name] = sorted(new_domain)

    debug_data = {
        "matching": matching,
        "reverse_matching": reverse_matching,
        "sccs": sccs,
        "reachable_from_unmatched": list(reachable_from_unmatched),
        "removed_edges": removed_edges,
        "residual_edges": {u: list(v) for u, v in edges_gr.items() if v}
    }

    return satisfiable, pruned_domains, debug_data
