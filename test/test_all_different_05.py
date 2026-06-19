from all_different import Variable, run_regin_filter

def test_mixed_domains_pruning():
    # Mixed domains where at least one value is pruned
    vars_ = [
        Variable("A", [1, 2]),
        Variable("B", [1, 2, 3]),
        Variable("C", [2, 3]),
    ]
    sat, pruned, _ = run_regin_filter(vars_)
    assert sat is True
    # Ensure pruning happened: at least one domain is strictly smaller than its original
    original = {
        "A": [1, 2],
        "B": [1, 2, 3],
        "C": [2, 3],
    }
    assert any(len(pruned[v]) < len(original[v]) for v in original)
    # All pruned domains must still be subsets of the originals
    for v, dom in pruned.items():
        assert set(dom).issubset(set(original[v]))
