from all_different import Variable, run_regin_filter

def test_no_pruning_singletons():
    # Each variable has a unique singleton domain – already all‑different
    vars_ = [
        Variable("A", [1]),
        Variable("B", [2]),
        Variable("C", [3]),
        Variable("D", [4]),
    ]
    sat, pruned, _ = run_regin_filter(vars_)
    assert sat is True
    # No pruning should occur; domains remain unchanged
    assert pruned == {
        "A": [1],
        "B": [2],
        "C": [3],
        "D": [4],
    }
