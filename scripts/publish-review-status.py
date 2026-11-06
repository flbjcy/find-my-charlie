"""Publish aggregate review status; keep the cumulative unique-ID ledger private.

Run after a completed tracked-thread review. Both frontends read the public
mirror's lib/reviewed-status.json. Repeat checks and edits never add to the total.
"""
import argparse
import json
from datetime import datetime
from pathlib import Path

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--registry', type=Path, default=root / '.openai/reddit-thread-registry.json')
parser.add_argument('--ledger', type=Path, default=root.parent / 'find-my-charlie-archive/reviewed-comment-ledger.json')
parser.add_argument('--output', type=Path, action='append')
args = parser.parse_args()
registry = json.loads(args.registry.read_text())
review = registry['lastIncrementalReview']
coverage = {row['url']: row for row in review['coverage']}
tracked = {row['url'] for row in registry['threads']}
if not tracked.issubset(coverage) or any(coverage[url]['loaded'] <= 0 for url in tracked):
    raise SystemExit('Incomplete tracked-thread review: preserve the last successful public status.')
checked = review['checkedAt']
checked_time = datetime.fromisoformat(checked.replace('Z', '+00:00'))
count = sum(row['loaded'] for row in coverage.values())
displayed = sum(int(row.get('displayed') or 0) for row in coverage.values())
ledger = json.loads(args.ledger.read_text()) if args.ledger.exists() else {}
ids = set(ledger.get('commentIds', []))
for comments in registry.get('lastVisibleCommentFingerprints', {}).values():
    ids.update(comment_id for comment_id in comments if comment_id.startswith('t1_'))
if not ids:
    raise SystemExit('No reviewed IDs available: do not invent a cumulative total.')
outputs = args.output or [root / 'lib/reviewed-status.json']
for output in outputs:
    old = json.loads(output.read_text()) if output.exists() else {}
    if old.get('checkedAt') and datetime.fromisoformat(old['checkedAt'].replace('Z', '+00:00')) > checked_time:
        raise SystemExit('Refusing to replace a newer public review timestamp.')
    if len(ids) < old.get('cumulativeReviewedCount', 0):
        raise SystemExit('Private ledger is incomplete: refusing to decrease the cumulative total.')
result = {
    'checkedAt': checked,
    'method': 'Full review' if review.get('fullCoverage') else 'Incremental browser review',
    'coverage': f"Latest check: {count} accessible comments across {len(coverage)} tracked threads. " + review.get('limitations', 'Older and deep-comment coverage may be incomplete.'),
    'reviewedCount': count,
    'cumulativeReviewedCount': len(ids),
    'cumulativeCountDefinition': 'Distinct Reddit comment IDs reviewed across all saved checks; repeated checks and edits count once.',
    'displayedCount': displayed,
    'threadCount': len(coverage),
    'fullCoverage': bool(review.get('fullCoverage')),
    'olderReviewPending': bool(registry.get('catchUpPending')),
    'lastExpandedReviewAt': registry.get('lastExpandedReviewAt'),
    'lastExpandedAccessibleCount': registry.get('lastExpandedAccessibleCount'),
    'lastExpandedDisplayedCount': registry.get('lastExpandedDisplayedCount'),
    'lastExpandedAttemptAt': registry.get('lastFullReviewAttemptAt'),
}
args.ledger.parent.mkdir(parents=True, exist_ok=True)
args.ledger.write_text(json.dumps({'version': 1, 'updatedAt': checked, 'commentIds': sorted(ids)}, indent=2) + '\n')
for output in outputs:
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2) + '\n')
print(f'Public status: {len(ids)} cumulative unique comments; latest check {count} across {len(coverage)} threads. IDs and feedback remain private.')
