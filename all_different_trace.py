import json
import pathlib
from typing import Any
from all_different import Variable, run_regin_filter


def generate_trace_steps(variables: list[Variable]) -> list[dict[str, Any]]:
    """
    Executes Regin's algorithm and compiles a step-by-step visualization trace.
    Steps include:
      0. Initial Bipartite Graph
      1. Maximum Matching Calculation
      2. Residual Graph Construction
      3. Strongly Connected Components (SCC) Detection
      4. Final Filtering (Pruning)
    """
    steps: list[dict[str, Any]] = []

    # Get Regin output and debug data
    satisfiable, pruned_domains, debug = run_regin_filter(variables)

    matching = debug["matching"]
    sccs = debug["sccs"]
    reachable = debug["reachable_from_unmatched"]
    removed_edges = debug["removed_edges"]
    residual_edges = debug["residual_edges"]

    # Gather all unique values in the domains
    all_values = sorted(list({val for v in variables for val in v.domain}))

    # --- Step 0: Initial Bipartite Graph ---
    init_edges = []
    for v in variables:
        for val in v.domain:
            init_edges.append({
                "var": v.name,
                "val": val,
                "direction": "undirected",
                "status": "normal"
            })

    steps.append({
        "step_no": 0,
        "phase": "init",
        "title": "Initial Bipartite Graph",
        "description": "Initial bipartite graph showing variables on the left and the union of domains on the right. Undirected edges connect variables to their possible domain values.",
        "variables": [{"name": v.name, "domain": list(v.domain)} for v in variables],
        "values": all_values,
        "edges": init_edges,
        "matching": {},
        "sccs": [],
        "reachable_nodes": []
    })

    # --- Step 1: Maximum Matching ---
    matching_edges = []
    for v in variables:
        matched_val = matching.get(v.name)
        for val in v.domain:
            is_matched = (matched_val == val)
            matching_edges.append({
                "var": v.name,
                "val": val,
                "direction": "undirected",
                "status": "matched" if is_matched else "normal"
            })

    matching_status_desc = (
        f"Maximum matching found of size {len(matching)} (complete matching)."
        if satisfiable else
        f"Maximum matching found of size {len(matching)} but we have {len(variables)} variables. "
        "No complete matching exists, meaning the AllDifferent constraint is UNSATISFIABLE."
    )

    steps.append({
        "step_no": 1,
        "phase": "matching",
        "title": "Maximum Bipartite Matching",
        "description": f"Calculate a Maximum Bipartite Matching using augmenting paths. Green/bold edges indicate the matched variable-value pairs. {matching_status_desc}",
        "variables": [{"name": v.name, "domain": list(v.domain)} for v in variables],
        "values": all_values,
        "edges": matching_edges,
        "matching": matching,
        "sccs": [],
        "reachable_nodes": []
    })

    # --- Step 2: Residual Graph ---
    residual_edges_list = []
    for v in variables:
        matched_val = matching.get(v.name)
        for val in v.domain:
            is_matched = (matched_val == val)
            # Matching: value -> variable (residual_backward)
            # Non-matching: variable -> value (residual_forward)
            dir_str = "val_to_var" if is_matched else "var_to_val"
            residual_edges_list.append({
                "var": v.name,
                "val": val,
                "direction": dir_str,
                "status": "matched" if is_matched else "normal"
            })

    steps.append({
        "step_no": 2,
        "phase": "residual",
        "title": "Directed Residual Graph",
        "description": "Construct the directed residual graph G_R. Edges in the matching are directed from values to variables (value -> variable). Non-matching edges are directed from variables to values (variable -> value). Unmatched values are highlighted.",
        "variables": [{"name": v.name, "domain": list(v.domain)} for v in variables],
        "values": all_values,
        "edges": residual_edges_list,
        "matching": matching,
        "sccs": [],
        "reachable_nodes": reachable
    })

    # --- Step 3: Strongly Connected Components ---
    scc_edges_list = []
    for v in variables:
        matched_val = matching.get(v.name)
        for val in v.domain:
            is_matched = (matched_val == val)
            dir_str = "val_to_var" if is_matched else "var_to_val"
            scc_edges_list.append({
                "var": v.name,
                "val": val,
                "direction": dir_str,
                "status": "matched" if is_matched else "normal"
            })

    # Group SCCs into format readable by JSON (list of dicts or lists)
    steps.append({
        "step_no": 3,
        "phase": "sccs",
        "title": "Strongly Connected Components (SCCs)",
        "description": "Identify Strongly Connected Components (SCCs) in G_R using Tarjan's algorithm. Nodes belonging to the same component are colored identically. Edges inside an SCC lie on a cycle and are guaranteed to belong to some maximum matching.",
        "variables": [{"name": v.name, "domain": list(v.domain)} for v in variables],
        "values": all_values,
        "edges": scc_edges_list,
        "matching": matching,
        "sccs": sccs,
        "reachable_nodes": reachable
    })

    # --- Step 4: Final Filtering ---
    filtered_edges = []
    for v in variables:
        matched_val = matching.get(v.name)
        for val in v.domain:
            is_matched = (matched_val == val)
            is_pruned = (v.name, val) in removed_edges
            filtered_edges.append({
                "var": v.name,
                "val": val,
                "direction": "undirected",
                "status": "pruned" if is_pruned else ("matched" if is_matched else "kept")
            })

    steps.append({
        "step_no": 4,
        "phase": "filtering",
        "title": "Final Filtering (Domain Pruning)",
        "description": "Pruning edges that cannot participate in any maximum matching. Edges are removed if they are not part of the matching, do not lie on any cycle (not in the same SCC), and do not lie on any alternating path starting from an unmatched value vertex. Red/dashed edges are pruned.",
        "variables": [{"name": v.name, "domain": pruned_domains[v.name]} for v in variables],
        "values": all_values,
        "edges": filtered_edges,
        "matching": matching,
        "sccs": sccs,
        "reachable_nodes": reachable,
        "pruned_domains": pruned_domains,
        "removed_edges": removed_edges
    })

    return steps

def log_start(variables: list[Variable]) -> None:
    print("AllDifferent filtering simulation:")
    print("Variables initial domains:")
    for v in variables:
        print(f"  {v.name}: {v.domain}")

def log_results(satisfiable: bool, pruned: dict[str, list[int]], removed_edges: Any)-> None:

    print(f"\nSatisfiable: {satisfiable}")
    print("Pruned domains:")
    for name, dom in pruned.items():
        print(f"  {name}: {dom}")
    print(f"Removed edges: {removed_edges}")

def save_json_data(steps: list[dict[str, Any]], data_dir: pathlib.Path) -> None:
    """
    Write and save steps into a json file
    """
    
    trace_path = data_dir / "all_different_trace.json"
    trace_path.write_text(json.dumps(steps, indent=2))
    print(f"\nTrace written successfully to: {trace_path}")

def save_md_table(satisfiable: bool, pruned: dict[str, list[int]], data_dir: pathlib.Path) -> None:
    """
    Generate and save comparison markdown table
    """

    md_content = [
        "# Regin's AllDifferent Filtering Comparison Table",
        "",
        "This table compares the variable domains before and after running Regin's global filtering algorithm for the `AllDifferent` constraint.",
        "",
        "| Variable | Initial Domain | Pruned Domain | Status / Removed Values |",
        "| :--- | :--- | :--- | :--- |"
    ]
    for v in variables:
        initial_dom = f"{{{', '.join(map(str, v.domain))}}}"
        pruned_dom = f"{{{', '.join(map(str, pruned[v.name]))}}}"
        removed = sorted(list(set(v.domain) - set(pruned[v.name])))
        status = f"Pruned values: {', '.join(map(str, removed))}" if removed else "No values pruned"
        md_content.append(f"| `{v.name}` | `{initial_dom}` | `{pruned_dom}` | {status} |")

    md_content.append("")
    md_content.append(f"**Constraint Satisfiable**: {satisfiable} (A complete maximum matching of size {len(variables)} was found).")

    comparison_path = data_dir / "regin_comparison_table.md"
    comparison_path.write_text("\n".join(md_content))
    print(f"Comparison markdown table written to: {comparison_path}")

def run_and_save_trace(variables: list[Variable]) -> None:

    # --- PROCESS ---

    steps = generate_trace_steps(variables)

    log_start(variables)

    satisfiable, pruned, debug = run_regin_filter(variables)

    log_results(satisfiable, pruned, debug['removed_edges'])

    # --- SAVE ---

    out_dir = pathlib.Path(__file__).parent
    data_dir = out_dir / "data"
    data_dir.mkdir(parents=True, exist_ok=True)

    save_json_data(steps, data_dir)

    save_md_table(satisfiable, pruned, data_dir)


if __name__ == "__main__":

    variables = [
        Variable("x1", [1, 2]),
        Variable("x2", [1, 2]),
        Variable("x3", [2, 3]),
        Variable("x4", [2, 3, 4, 5]),
    ]

    # variables = [
    #     Variable("A", [1]),
    #     Variable("B", [2]),
    #     Variable("C", [3]),
    #     Variable("D", [4]),
    # ]

    # variables = [
    #     Variable("A", [1, 2, 3]),
    #     Variable("B", [1, 2, 3]),
    #     Variable("C", [1, 2, 3]),
    # ]

    run_and_save_trace(variables)
