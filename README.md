# My Job Apply — real starter project

This is a separate project and does not touch the existing All in One app.

## What is implemented
- Android-friendly static web app for saving job links, descriptions, status, notes, basic keyword overlap, and JSON backup/import.
- A Manifest V3 Chrome/Edge extension that fills common fields on the active tab after you click it.
- Submit is never triggered on page load. It can only be attempted after you explicitly choose **Fill & submit** and tick the authorization checkbox. It only clicks a clearly labelled submit button if the detected required fields are filled.
- It reports the action it took, not that the employer received the application. Verify the confirmation on the job website.

## Important limitations (read before using)
There is no universal API or form structure for all major job websites. LinkedIn, Naukri, Indeed, Workday, Greenhouse, Lever, company ATS portals and other sites change their layouts and may use dynamic forms. The extension is a generic assistive implementation, not a guarantee of compatibility with each portal.
- It does not bypass login, CAPTCHA, MFA, paywalls, access controls, anti-bot systems, or website terms.
- It does not invent answers to screening questions or choose demographic/legal declarations.
- Resume upload controls are not filled automatically. Attach the resume manually when needed.
- The extension does not inspect whether an application was actually received. Look for the portal's success confirmation and update the tracker.
- Test on a draft/test form first. A submit click may send a real application.
- Chrome on Android does not support normal desktop extensions. The web tracker works on Android; extension automation currently requires desktop Chrome/Edge. Some Android browsers support extensions, but this extension has not been certified for them.
- Static hosting has no cloud sync; records live in the browser's local storage. Export backups. Do not use this version on a shared device.

## Publish the web app for free
1. Create a **new** GitHub repository named `my-job-apply` (do not use the existing All in One repository).
2. Upload the contents of `web/` to the root of that new repository.
3. In GitHub: Settings → Pages → deploy from branch `main`, folder `/ (root)`.
4. Open the HTTPS Pages URL on Android Chrome. Use the browser menu → Add to Home screen / Install app.

## Install the extension on a computer
1. Unzip the project.
2. In desktop Chrome open `chrome://extensions`; in Edge open `edge://extensions`.
3. Enable Developer mode → Load unpacked → choose the `extension/` folder.
4. Open a normal job application page. Reload it after installing the extension.
5. Click the extension, enter your profile, Save profile, then choose Fill form or Fill & submit.
6. Inspect every field before submitting. If the form is custom or the extension cannot identify a field, complete it yourself.

## Next steps for production-grade support
Per-site integrations and tests are needed for each target portal. A hosted backend could provide secure profile sync, but it would require authentication, privacy controls, and a secure file store. Do not put passwords, session cookies, or portal credentials in this static app.
