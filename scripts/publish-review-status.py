"""Generate a public, text-free review summary from the private local registry.

Run after a completed tracked-thread review, then commit/push the public mirror's
lib/reviewed-status.json. Both frontends read that one shared file at runtime.
"""
import argparse
import json
from datetime import datetime
from pathlib import Path

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--registry', type=Path, default=root / '.openai/reddit-thread-registry.json')
parser.add_argument('--output', type=Path, action='append')
args = parser.parse_args()
registry = json.loads(args.registry.read_text())
review = registry['lastIncrementalReview']
coverage = {row['url']: row for row in review['coverage']}
tracked = {row['url'] for row in registry['threads']}
if not tracked.issubset(coverage) or any(coverage[url]['loaded'] <= 0 for url in tracked):
    raise SystemExit('Incomplete tracked-thread review: preserve the last successful public status.')
checked = review['checkedAt']
datetime.fromisoformat(checked.replace('Z', '+00:00'))
count = sum(row['loaded'] for row in coverage.values())
displayed = sum(int(row.get('displayed') or 0) for row in coverage.values())
outputs = args.output or [root / 'lib/reviewed-status.json']
for output in outputs:
    old = json.loads(output.read_text()) if output.exists() else {}
    if old.get('checkedAt') and datetime.fromisoformat(old['checkedAt'].replace('Z', '+00:00')) > datetime.fromisoformat(checked.replace('Z', '+00:00')):
        raise SystemExit('Refusing to replace a newer public review timestamp.')
    result = {
        'checkedAt': checked,
        'method': 'Full review' if review.get('fullCoverage') else 'Incremental browser review',
        'coverage': f"Latest check: {count} accessible comments across {len(coverage)} tracked threads. " + review.get('limitations', 'Older and deep-comment coverage may be incomplete.'),
        'reviewedCount': count,
        'displayedCount': displayed,
        'threadCount': len(coverage),
        'fullCoverage': bool(review.get('fullCoverage')),
        'olderReviewPending': bool(registry.get('catchUpPending')),
        'lastExpandedReviewAt': registry.get('lastExpandedReviewAt'),
        'lastExpandedAccessibleCount': registry.get('lastExpandedAccessibleCount'),
        'lastExpandedDisplayedCount': registry.get('lastExpandedDisplayedCount'),
        'lastExpandedAttemptAt': registry.get('lastFullReviewAttemptAt'),
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2) + '\n')
print(f'Prepared public status: {checked}; {count} comments across {len(coverage)} threads. No raw comments or private feedback exported.')
