import sys

sys.path.insert(1, '../all_different.py')

from all_different import Variable, run_regin_filter

def test_default_example():
    vars_ = [
        Variable("x1", [1, 2]),
        Variable("x2", [1, 2]),
        Variable("x3", [2, 3]),
        Variable("x4", [2, 3, 4, 5]),
    ]
    sat, pruned, _ = run_regin_filter(vars_)
    assert sat is True
    assert pruned == {
        "x1": [1, 2],
        "x2": [1, 2],
        "x3": [3],
        "x4": [4, 5],
    }
