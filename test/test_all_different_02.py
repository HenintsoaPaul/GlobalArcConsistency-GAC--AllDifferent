from all_different import Variable, run_regin_filter

def test_unsatisfiable():
    # Two variables both can only take value 1 -> unsatisfiable
    vars_ = [
        Variable("A", [1]),
        Variable("B", [1]),
    ]
    sat, pruned, _ = run_regin_filter(vars_)
    assert sat is False
    # Domains remain unchanged because no pruning can make it satisfiable
    assert pruned == {"A": [1], "B": [1]}

if __name__ == "__main__":
    test_unsatisfiable()
