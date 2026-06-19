from all_different import Variable, run_regin_filter

def test_no_pruning_full_domains():
    # Three variables each with the same full domain – still satisfiable, no pruning
    variables = [
        Variable("A", [1, 2, 3]),
        Variable("B", [1, 2, 3]),
        Variable("C", [1, 2, 3]),
    ]
    sat, pruned, _ = run_regin_filter(vars_)
    assert sat is True
    # No pruning should happen; domains remain unchanged
    assert pruned == {
        "A": [1, 2, 3],
        "B": [1, 2, 3],
        "C": [1, 2, 3],
    }
