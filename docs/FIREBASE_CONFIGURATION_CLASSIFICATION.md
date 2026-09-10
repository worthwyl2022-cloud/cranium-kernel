# Firebase Configuration Classification

**Assessment date:** 10 September 2026  
**Scope:** Public repository scan of the `worthwyl2022-cloud` account.

## Files reviewed

| Repository | File | Classification | Action |
|---|---|---|---|
| `Cranium-Core-hardened-final-` | `firebase-applet-config.json` | Public browser configuration; contains Firebase project identifiers, OAuth client ID, and an API-key-shaped value | Keep only if the Firebase project is intended for web clients. Confirm API restrictions, authorized domains, App Check, Authentication, Firestore, and Storage rules. |
| `WorthWyl-game-changer` | `firebase-applet-config.json` | Public browser configuration; references the same Firebase project and includes a Firestore database identifier | Perform the same controls review, with special attention to Firestore rules and whether the database is shared unintentionally. |

## Security determination

The `AIza...` value is a Firebase Web API key. Its presence in a browser-facing configuration file is **not by itself evidence of a leaked privileged secret**. Firebase Web API keys identify a project and are commonly shipped to clients. They do not replace Firebase Authentication or authorization rules.

This classification does **not** certify the projects as secure. Firebase-side verification is still required for:

1. API-key restrictions and allowed APIs.
2. Authorized JavaScript origins and OAuth redirect domains.
3. Firebase Authentication providers and authorized domains.
4. Firestore and Realtime Database security rules.
5. Cloud Storage security rules.
6. App Check enforcement where appropriate.
7. Billing alerts and abuse monitoring.
8. Git history and deployment environments for service-account keys, private keys, or other privileged credentials.

No service-account private key or confirmed privileged credential was found in the account-wide source scan. The placeholder `ghp_xxxxxxxxxxxxxxxxxxxx` in `Cranium-Core-hardened-final-/src/components/GitHubPusher.tsx` is classified as an example placeholder, not a live token.

## Release rule

These files must not be described as secrets or as proof of security. They may remain public only after the Firebase project owner confirms the controls above. If any privileged credential is discovered in history, revoke and rotate it immediately, remove it from the working tree, and document the incident separately.
