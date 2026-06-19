from all_different import Variable, run_regin_filter

def test_default_without_five():
    # Same as README example but without the value 5 in x4's domain
    vars_ = [
        Variable("x1", [1, 2]),
        Variable("x2", [1, 2]),
        Variable("x3", [2, 3]),
        Variable("x4", [2, 3, 4]),
    ]
    sat, pruned, _ = run_regin_filter(vars_)
    assert sat is True
    # Expected pruning: x3 loses 2, x4 loses 2 and 3, leaving only 4
    assert pruned == {
        "x1": [1, 2],
        "x2": [1, 2],
        "x3": [3],
        "x4": [4],
    }
