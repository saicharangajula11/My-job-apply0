# My Job Apply

A separate, mobile-friendly job tracker PWA for Android and desktop. Designed for free static hosting (for example, GitHub Pages).

## Included in this starter version
- Save job title, company, job URL, location, status, description, notes and chosen resume profile.
- Search and filter saved jobs.
- Track Saved, Ready, Applied, Interview and Rejected statuses.
- Save resume files/profile names in the current browser's local storage.
- Basic keyword match estimate using job text and profile name (not a true ATS score).
- Export and restore a JSON backup.
- PWA manifest, service worker and app icons.
- Web Share Target declaration for compatible Android/browser share menus.

## Important current limitations
- The app does **not** submit applications automatically to LinkedIn, Naukri, Indeed or other sites. It opens the application URL and lets you complete the site's own process.
- The current match score is intentionally simple. It compares words from the resume profile name against the job title/description; it does not parse resume content or assess qualifications.
- Files and records are stored locally in the browser. They do not sync between devices and can be lost if browser data is cleared. Export backups regularly.
- Resume files are stored as data in browser localStorage, so large files may exceed browser storage limits. Keep each resume small.
- The Share Target feature only works if the app is hosted over HTTPS, installed, and the browser supports Web Share Target. Otherwise, copy a URL and paste it in the app.
- Static hosting cannot safely hold secrets or provide secure cross-site automation.

## Install on Android
1. Host the contents of this folder on an HTTPS site (GitHub Pages works).
2. Open the hosted URL in Chrome on Android.
3. Use Chrome's menu > **Install app** or **Add to Home screen**.
4. To share a job, open the job page, tap Share and choose My Job Apply if it appears. If it does not appear, copy the URL and paste it in the app.

## Deploy to GitHub Pages
1. Create a new GitHub repository named `my-job-apply` (or another name).
2. Upload `index.html`, `manifest.webmanifest`, `sw.js`, `icon.svg`, `icon-192.png`, `icon-512.png`, and this README to the repository root.
3. In repository Settings > Pages, choose deploy from branch and select `main` / root.
4. Open the HTTPS Pages URL after deployment completes.
5. If the app is hosted in a repository subpath, all paths in this project are relative, so it should work from that path.

## Safe path to stronger automation
1. Keep this app as the job inbox and tracker.
2. Add a browser extension for user-triggered field assistance on specific supported sites; request only the minimum permissions and keep the user in control.
3. For any backend, use a secure API and database, never expose API keys in frontend files.
4. Prefer official employer/ATS integrations where available. Do not bypass CAPTCHAs, login protections, rate limits, or site terms.
5. Require review before final submission, and record a job as Applied only after the site confirms submission or the user marks it applied.

## Data backup
Use **Export backup** regularly. Restore through **Import / restore backup**. Restoring replaces the current local job/resume data.
