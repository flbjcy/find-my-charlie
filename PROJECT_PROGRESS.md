# FindMyCharlie: project progress

**Jia Hao Liang · October 25-November 27, 2026 · all times Eastern**
**Live map:** https://flbjcy.github.io/find-my-charlie/  
**Source:** https://github.com/flbjcy/find-my-charlie

FindMyCharlie maps eight collectible CharlieCard designs using reviewed Reddit sightings and collector submissions. Pins show machine, exit, observation time, source and confidence. Independent community project by Jia Hao Liang.

## Progress by time

Approximate Eastern times from project history; these date project changes, not station visits.

| When (ET) | What changed |
| --- | --- |
| **Oct 25, 6 PM** | Built the shared map, report API and community form for eight card designs, with subway routes and station entrances. OpenStreetMap tiles require no paid map key. |
| **Oct 26, 1–2 PM** | Added reviewed Reddit sightings and a simpler map-first interface. Replaced generic symbols with cropped photos of the eight real cards. |
| **Oct 26, 9 PM** | Fixed the incorrectly plotted Green Line near Back Bay using official MBTA route shapes. |
| **Oct 26, 11 PM** | Published **FindMyCharlie** on GitHub Pages with the shared backend, anonymous traffic counts and a simpler branded header; removed the failing sync banner. |
| **Oct 27, 2–10 AM** | Expanded reviews to related threads and nested replies. Made newer sold-out, broken and regular-only observations replace older stock reports for the same machine and card. |
| **Oct 27, 11 AM–2 PM** | Added card photos to the report form and a Report unavailable action. Grouped same-card reports by confidence using time, corroboration and useful details. Started the private evidence archive. |
| **Oct 27, 2–5 PM** | Corrected an edited Haymarket description without refreshing the sighting time. Fixed duplicate State pins, grouped machines under one station, and reduced overlapping labels and pointer crossings. |
| **Oct 27, 5–11 PM** | Published supported Reddit and community corrections, keeping Harvard machines separate. Added the developing FindMyCharlie discussion to the source registry. |
| **Oct 28, 1–2 AM** | Recovered a missed Tufts photo report: orange Old State House card, **221072**, observed Oct 27 at 8:30 PM. Added an older Airport silver report. Moved the PDF into Info and improved Aquarium/Tufts label positions and pointer lines. |
| **Oct 28, 11 AM** | Added optional machine photos, View photo links, resizing and metadata removal. Added an on-device clarity check, hourly anonymous activity counts, and GitHub cloud backups while the Mac sleeps. |
| **Oct 28, noon** | Distinguished Harvard **221121 down** from **221123 yellow** at 11:30 AM. Reviewed Park Street orange without duplicating a newer community report; normalized labels such as Unknown221123. |
| **Oct 28, 3 PM** | Reviewed 11 threads, including older replies: 304 of 325 displayed comments were accessible. Confirmed Park Street orange 221186 and recovered an older Malden purple photo report, 221030. |
| **Oct 28, 10 PM** | Added historical State yellow 221277, North silver 221045 and dark-blue 222029 confirmations. A newer negative superseded the dark-blue report. Updated measured activity charts. |
| **Oct 28, 10–11 PM** | Merged unique short machine suffixes with full IDs at the same station/card, including Park186 / 221186. Removed the mistaken Airport copy of an Aquarium report. Added browser-held removal keys, accepted payment choices and replacement of the default Unknown text when typing. |
| **Oct 29, 10 AM** | Caught up after deferred reviews. Added North Station green BPL 221042 at Valenti Way, observed 12:32 AM; the photo confirms the machine and text identifies the design. Incremental review covered 148 loaded comments in 11 threads. |
| **Oct 29, 6–7 PM** | Verified Tufts orange 221072, Medical Center side, with 5:38 PM posting-time fallback. A North silver photo corrected 222629 to **222029**; exact observation time remained uncertain. |
| **Oct 30, 11 AM** | Searched for new discussions and reviewed 338 accessible comments of 360 displayed across 14 threads; 22 remained inaccessible. Inspected two new collection photos. Preserved uncertain recollections and cross-post context without inventing fresh stock. |
| **Oct 30, 2 PM** | Added private **Feedback** and scheduled triage. Corrected Back Bay purple **221106 to 221107**, preserving the original and observation time. Checked storage, validation, spam limits and mobile layout. |
| **Oct 30, 2:30 PM** | Fixed report loading after a backend host change: redirects lacked CORS headers. Updated the frontend and archive to call the current host directly; verified reads and submission preflight. |
| **Oct 30, 3 PM** | Added a State yellow report from10:30 AM: two far-right machines at the Old State House entrance. Machine numbers and exact exit remain unknown. The already-corrected Back Bay request was not counted as a new sighting. |
| **Oct 30, 5–9 PM** | Separated eight store entries from State; a compact star at 296 Washington St opens on hover/focus/tap and closes after leaving. It sits above routes, below station dots/cards. Corrected three Harvard **22123 to 221123** typos, preserving times and the yellow sold-out report. Two feedback corrections already had replacement submissions. |
| **Oct 31, 9 AM** | Reviewed 348 accessible comments across 14 threads; 37 counted entries remained inaccessible. Added a Harvard dark-blue purchase with unknown machine and a posting-time fallback. Kept the store separate. Daily searches found no new relevant threads; full prior-image reinspection remains pending. |
| **Oct 31, 6 PM** | Caught up on tracked replies. A noon green-card confirmation at North Station 221042 superseded its 9:30 AM regular-only report; an unknown-machine negative stayed separate. Preserved observation times and refreshed measured charts. |
| **Nov 2, 4 PM** | Caught up after a browser gap and tracked a new r/boston thread. Added its Back Bay purple purchase with unknown machine/exit and a clearly marked posting-time fallback. Archived three suggestions privately for review. |
| **Nov 3** | Photo-verified Downtown Crossing yellow **221061**, preserving its Nov 2 posting-time fallback. Fixed North’s unknown machine from remark **221104**; clear full-number remarks now fill unknown fields. Preserved originals and checked negative/history grouping. |
| **Nov 5, morning** | Inspected a new store thread’s full-size card photo. Updated the separate star: all designs reported Nov 4, time unknown; reporter says two free cards. Excluded store stock from State reports/counts. |
| **Nov 6** | Linked both sites to one shared status feed. The cumulative counter uses unique comment IDs and never decreases; repeat checks and edits count once. Latest-check coverage stays separate. Missed checks retain the previous timestamp. |

## Problems we found and how we handled them

| Problem | Change or current status |
| --- | --- |
| **Comments were spread across multiple threads and nested replies.** | Tracked relevant discussions, kept source links and review notes, and reviewed reply context. Checks every two hours compare recent comments; wider expanded reviews are scheduled daily. Coverage is reported honestly when older or collapsed comments cannot be opened. |
| **Reddit's server API was blocked.** | Used browser-reviewed reports rather than pretending the map had a live Reddit feed. Community submissions go into the shared backend immediately; Reddit additions depend on the scheduled review and successful publication. |
| **A report could be stale after cards sold out or a machine broke.** | Kept negative observations in history and hid superseded availability for the same machine and card. A negative for one machine does not erase a different machine at the same station. |
| **Harvard yellow and Forest Hills green seemed missing or inconsistent.** | Separated machine-specific reports and their observation times. Harvard 221121 sold out while 221123 had later positive reports; Forest Hills 221270 had a later negative while separate community reports identified 221100. The map now preserves these distinctions. |
| **A single station appeared as two pins.** | Grouped reports by station before drawing markers, so State has one pin with its different machines and cards inside. |
| **Many reports for one card made a station panel hard to scan.** | Grouped by card, ranked current machine reports by recency and corroboration, and put earlier reports in expandable history. Longer prose alone does not raise confidence. |
| **A machine number attached to a word produced a duplicate row.** | Recognized six-digit machine numbers even in entries such as “Unknown221123,” so they merge with reports that write “Machine 221123.” On Oct 28 at 11 PM, also standardized displayed labels: a single identifiable machine number (e.g. “Unknown221054” becomes “221054”), or “Unknown” otherwise. Original wording stays stored. |
| **Short machine numbers appeared as separate machines.** | Matched a three- to five-digit suffix to a unique full ID at the same station and for the same card. Ambiguous suffixes remain separate. The same match is used for sold-out overrides and report history. |
| **A report was submitted under the wrong station.** | Excluded the mistaken Airport copy while keeping the Aquarium report. Added browser-held removal keys for new community submissions, so a submitter can retract an error and resubmit correctly. |
| **White station labels overlapped and pointer lines crossed boxes.** | Added a layout pass that finds freer positions around each station and clips connector lines at label edges. Dense maps can still be constrained by screen size and zoom. |
| **Aquarium and Tufts labels were reversed and downtown pointers clumped.** | Gave Aquarium the eastern label position, kept Tufts to its west, and penalized crossing pointer segments when choosing positions. The labels still move with zoom and available screen space. |
| **The Green Line path near Back Bay was inaccurate.** | Replaced the incorrect plotted section with MBTA route geometry. Lines are geographic context, not live service status. |
| **A Tufts photo report was missed.** | Full-size inspection revealed the orange card and machine number that were not in the comment text. This correction is recorded as a review error rather than silently rewriting the audit. A related-thread check also found an older Airport silver report. Other photo-only reports need the same explicit visual check. |
| **An older Malden photo was overlooked.** | Rechecked the photo and its nearby comment: the image shows the purple Zakim Bridge card, and the comments identify Malden Center machine 221030. Added the historical sighting with the October 23 posting time as a fallback and an explicit warning that current stock is unknown. |
| **Public data needed a recoverable history.** | Created a private GitHub archive of dated report-feed snapshots, including community submissions, plus reviewed Reddit evidence and coverage notes. It is not a complete verbatim copy of every Reddit comment. |
| **Machine and payment details were hard to report.** | Added optional machine photos and accepted-payment choices. “Unknown” machine text is selected on click so a reporter can replace it by typing. |
| **A machine photo could be too blurry or dark to help anyone.** | Added a conservative browser-only quality check before upload. It catches obvious technical problems, but it does not verify that a photo depicts a machine or screen for inappropriate content. |
| **Local browser reviews stop when the Mac locks or sleeps.** | Kept the live site independent of the Mac and added a cloud backup for public reports and hourly counts. This preserves new community submissions while offline, but it does not read new Reddit comments; that requires a separate approved cloud integration. |

## Hourly activity

The charts in the PDF use a snapshot taken **November 28 at 12:53 AM ET**: **7,891 recorded page views**, **7,147 approximate visits**, and **755 lifetime community submissions**. The activity total is **767: submissions plus 12 user removals**. Older removals without saved times remain in the lifetime total only, without an invented hour. Hourly report bars show submissions, including unavailable reports. This PDF is static, not live data. Counts are saved in report-data/hourly-activity-2026-11-28T05-53-46Z.json.

## Measured snapshot

At **about 1:35 AM ET on October 28**, before the Tufts correction was published, the live site showed **388 page views** and **362 visits** in its 90-day anonymous traffic dashboard. It served **97 report entries**: **46 community reports** and **51 reviewed Reddit reports**, including historical and unavailable entries. These are report entries, not unique people or currently available machines. Visits are approximate browser-tab sessions; reloads add page views. The dashboard excludes known bots and privacy opt-outs. The count will change as new reports arrive.

## How the system works now

GitHub Pages serves the public map at the address above. A shared Sites backend stores community reports and serves the report feed, while reviewed Reddit evidence is incorporated through published source updates. Official MBTA station, entrance, and route geometry supplies map context; when a comment does not identify an entrance, the site says **Exit unknown**. The map deliberately avoids claiming that an older sighting guarantees stock today. The private archive is kept separately from the public website repository.

## What remains imperfect

Reddit browser access is not guaranteed, and a scheduled review is not instant or exhaustive. Photo-only details, deep replies, edits, and ambiguous station language need manual attention. Visitor counts are approximate, and machine availability can change between any observation and a collector's arrival. Future reviews should inspect full-size images attached to candidate comments before excluding a sighting.

## Evidence and links

- [Public website and code](https://github.com/flbjcy/find-my-charlie)
- [Original r/mbta discussion](https://www.reddit.com/r/mbta/comments/1xaqcns/limited_edition_special_design_charlie_cards/)
- [FindMyCharlie Reddit discussion](https://www.reddit.com/r/mbta/comments/1xhdiol/findmycharlie_an_interactive_map_to_find/)
- [Tufts Medical Center photo report](https://www.reddit.com/r/mbta/comments/1xaqcns/comment/19rr8kfh46wlh/)
- [Public traffic dashboard](https://flbjcy.github.io/find-my-charlie/?traffic=1)
- [MBTA V3 API](https://api-v3.mbta.com/)

The timeline was reconstructed from the project and GitHub commit histories; the traffic and report totals were read from the live site at the stated time. The private archive contains fuller review evidence and dated report snapshots.

## November 24, 2026, 5 PM ET update

Added a dated Copley Bunker Hill observation for machine 221210, toward North Station via the entrance in front of Boston Public Library. Kept Exit unknown because the description is not matched to a canonical entrance. The same comment names “State House” at another machine without a color or photo; that design remains uncertain and was not imported. The PDF charts use the actual anonymous hourly-count snapshot captured November 24 at 5:01 PM ET, not live data; no traffic before tracking began is fabricated.

## November 24, 2026, 9 PM review update

An edited source resolved the Copley State House design as dark blue; added the nearest-bank rightmost machine with machine number and Exit unknown, retaining the approximate 5 PM observation time. Added yellow Bunker Hill at Haymarket machine 221049, observed at 5:15 PM. Other machines and designs are not inferred. Refreshed the static PDF charts from actual hourly counts captured at 9:29 PM ET.

## November 25, 2026, 9 PM review update

Added a dated visitor-reported November 25–26 closure notice to the separate Charlie Service Center star at 296 Washington Street. Exact visit time is unknown and the notice is not independently verified; retained the original November 4 stock observation. No store stock was added to station reports or counts. Refreshed static PDF charts with actual hourly counts captured at 9:05 PM ET.


## November 27, 2026, Bump feature update

Added a green Bump action beside Report unavailable. It copies the station, exit, card design, machine, payment and notes into an editable report, defaults availability to found, and starts with the visitor's current check time. Visitors review and submit a new community confirmation; earlier reports and photos remain in history. Existing photos are not resubmitted as fresh evidence.

A picture announcement introduces Bump on the next visit, once per browser. Visitors can close it with X or Escape; it also closes after 10 seconds. Checked the prefilled fields and submission against a local test API, the existing unavailable-report flow, automatic dismissal and dismissal persistence. Refreshed the PDF charts from actual anonymous counts captured November 27 at 10:53 PM ET.


## November 27, 2026, popup and map label refinement

Simplified the announcement to “New addition: Bump a finding,” one example with the real green Boston Public Library card photo, and a short explanation. Matched Bump to the Report unavailable font. The translucent popup keeps its countdown beside X and closes after 10 seconds.

Replaced long, displaced station callouts with short local pointers. Labels do not overlap, cross pointers or cover station dots. Crowded stations remain tappable dots with station-name tooltips; more card labels appear on zoom. Checked dense layouts, stable placement, bounded pointer lengths, zoom disclosure, the popup image and matching button fonts. Refreshed the static PDF charts from actual anonymous counts captured November 27 at 11:06 PM ET.


## November 27, 2026, community count verification

Verified the live database contains 754 community submissions: 636 available, 106 unavailable and 12 retracted. One additional retained database row is excluded by the removal registry, leaving 741 community reports in the public feed and 13 removed or retracted submissions overall. The latest submission arrived November 27 at 8:58 PM ET. The lifetime total is current; it is not an available-machine count.

Added a live community summary to the traffic dashboard with lifetime submissions, retained and removed totals, latest submission time and refresh timestamp. It reloads every minute. The PDF retains a dated static snapshot and clearly separates lifetime submissions from retained reports. No total was increased without a new submission.


## November 27, 2026, V2.1 display update

Restored a visible card label for every station with available cards. The layout no longer collapses crowded station labels into dots. It searches and refines all label positions together, favoring nearby placements, geographic order and fewer pointer crossings while retaining every label. Map controls and credits reserve space.

Card pictures are sorted by each design's newest observation within the station. The grid has two columns: newest top left, second top right, third bottom left, then across each subsequent row. The reminder is titled “V2.1 update: Bump a finding” and has a translucent tint mixed from the site's yellow. Verified 30 labels for 30 stations in the preview, row order, layout tests and report-state checks. Refreshed static activity charts from actual counts captured November 27 at 11:20 PM ET.


## November 27, 2026, station display restoration

Restored the original station-label placement algorithm, label sizes and pointer styling at the owner's request. Kept the newest-first, two-column card order. For odd card counts, the final card spans both columns and is centered, including a single-card station. Verified exact centering for 1-, 3- and 5-card station labels in the browser, station coverage, layout tests and type checking. The V2.1 yellow reminder and Bump flow remain in place. Refreshed static PDF charts from actual counts captured November 27 at 11:37 PM ET.


## November 27, 2026, exact original display baseline

Restored the station rendering, card-picture styling, marker geometry, initial map view, fit bounds, zoom limits and reset framing from the saved source before this work (Sites source 5e9d13c; public mirror 2df5e6d). Kept Bump, the V2.1 reminder and live community totals. Discarded the unpublished enlargement experiment. Added a checked station-display baseline so subsequent builds reject unintended changes to the saved station styles, map initialization and layout algorithm. Both hosted versions use the same baseline.


## November 27, 2026, V2.2 report activity and My reports

Audited all 755 distinct community rows: 637 available, 106 unavailable and 12 retracted. Under the owner's clarified rule, each submission counts once and removing it adds a second activity, producing 767 community report activities. The six November 27 submissions are included. Older removal dates were not recorded, so those 12 removals remain undated rather than being attributed to that day. One administrative exclusion is separate from user removal actions.

Added a nullable removal timestamp. Future successful user removals save their actual time and count once; repeated attempts cannot add another event. Both the map traffic page and personal website now read the same inclusive activity total from the live hourly feed, while the distinct Reddit-comment review total keeps its separate definition.

Moved browser-owned reports into a blue My reports button directly beside + Report, with station, design, machine, observation time and removal controls. The yellow V2.2 reminder explains both Bump and My reports. Checked a local test submission appearing in the panel, count arithmetic, unavailable submissions, duplicate-removal protection and Eastern day boundaries. Original station rendering and zoom remain protected by the saved baseline.


## November 28, 2026, V2.1 reminder refinement

Moved My reports immediately left of + Report and matched its text, background and border colors to Feedback. Simplified the reminder into two separate bullets, one for Bump and one for My reports, and relabeled it V2.1 at the owner's request. A pointer follows the actual My reports button, including after responsive layout changes; the popup stays below the header. Updated the picture demo to match the new button order and colors. Verified desktop and narrow-screen rendering, exact color matches, button order, two bullets and pointer alignment. The original station-display baseline remains unchanged. Refreshed the PDF charts from actual anonymous activity counts captured November 28 at 12:53 AM ET.
