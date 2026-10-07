from eval.loader import Group
from eval.score import ScoreConfig, confusable_pairs, score, scored_true_groups


def G(gid, refs):
    return Group(group_id=gid, members=[tuple(r) for r in refs])


def test_perfect_partition_scores_full():
    gt = {
        "A": {("f1", "a1"), ("f2", "a2"), ("f3", "a3")},
        "B": {("f1", "b1"), ("f4", "b4")},
    }
    groups = [G("g1", gt["A"]), G("g2", gt["B"])]
    res = score(groups, gt)
    assert res.scored_parts == 2
    assert res.recall_partial == 1.0
    assert res.pairwise_precision == 1.0
    assert res.true_positive_pairs == res.true_pairs == 4  # C(3,2)+C(2,2)


def test_split_group_gets_partial_credit():
    # n = 4 -> needs 3 connections; 2+2 gives (1+1)/3
    gt = {"A": {("f1", "1"), ("f2", "2"), ("f3", "3"), ("f4", "4")}}
    groups = [G("g1", [("f1", "1"), ("f2", "2")]), G("g2", [("f3", "3"), ("f4", "4")])]
    res = score(groups, gt)
    assert abs(res.recall_partial - 2 / 3) < 1e-9


def test_doing_nothing_scores_zero():
    gt = {"A": {("f1", "1"), ("f2", "2")}, "B": {("f1", "3"), ("f2", "4")}}
    res = score([], gt)
    assert res.recall_partial == 0.0
    assert res.pairwise_precision == 0.0
    assert res.pairwise_recall == 0.0


def test_merge_everything_full_recall_but_low_precision():
    gt = {
        "A": {("f1", "1"), ("f2", "2"), ("f3", "3"), ("f4", "4")},
        "B": {("f1", "5"), ("f4", "6")},
    }
    all_refs = [r for refs in gt.values() for r in refs]
    res = score([G("mega", all_refs)], gt)
    assert res.recall_partial == 1.0  # exploitable by recall alone
    assert res.pairwise_precision < 0.5
    assert res.polluted_groups == 1
    assert res.false_positive_pairs == 15 - 7


def test_singleton_parts_are_not_scored():
    gt = {"C": {("f9", "c9")}, "A": {("f1", "1"), ("f2", "2")}}
    res = score([G("g1", [("f1", "1"), ("f2", "2")])], gt)
    assert res.scored_parts == 1
    assert res.recall_partial == 1.0


def test_unknown_refs_are_flagged_and_count_as_false_positive():
    gt = {"A": {("f1", "1"), ("f2", "2")}}
    groups = [G("g1", [("f1", "1"), ("f2", "2"), ("f1", "ghost")])]
    res = score(groups, gt)
    assert res.unknown_refs == 1
    assert res.false_positive_pairs >= 1


def test_collapse_intra_file_duplicates():
    gt = {"A": {("f1", "1"), ("f1", "2"), ("f2", "3")}}
    plain = scored_true_groups(gt, ScoreConfig(collapse_intra_file_dupes=False))
    collapsed = scored_true_groups(gt, ScoreConfig(collapse_intra_file_dupes=True))
    assert len(plain["A"]) == 3
    assert len(collapsed["A"]) == 2


def test_over_merge_purity_penalizes_polluted_group():
    gt = {"A": {("f1", "1"), ("f2", "2")}}
    # one group holding true pair + a foreign row -> purity 2/3
    groups = [G("g1", [("f1", "1"), ("f2", "2"), ("f3", "foreign")])]
    res = score(groups, gt, cfg=ScoreConfig(over_merge="purity"))
    assert abs(res.purity_recall - 2 / 3) < 1e-9
    assert res.headline == res.purity_recall


def test_confusable_pairs_detects_one_attribute_diff():
    real_parts = {
        "A": {"category": "Contactor", "attrs": {"amps": 30, "poles": 2}},
        "B": {"category": "Contactor", "attrs": {"amps": 30, "poles": 3}},
        "C": {"category": "Contactor", "attrs": {"amps": 40, "poles": 3}},
    }
    pairs = confusable_pairs(real_parts)
    assert frozenset(("A", "B")) in pairs
    assert frozenset(("A", "C")) not in pairs  # differs in two attributes
    assert frozenset(("B", "C")) in pairs


def test_overlapping_groups_are_merged():
    gt = {"A": {("f1", "1"), ("f2", "2")}}
    groups = [G("g1", [("f1", "1")]), G("g2", [("f1", "1"), ("f2", "2")])]
    res = score(groups, gt)
    assert res.overlapping_groups >= 1
    assert res.recall_partial == 1.0
