# Security

Report vulnerabilities to worthwyl2022@gmail.com with:
- affected path
- command to reproduce
- whether authority was granted when it should have been denied

Do not file public issues for cryptographic or authority-bypass reports.

Known non-vulnerabilities / prototype limits:
- Replay guard is in-memory
- Ed25519 keys used in checks are generated for tests
- Lab UI is not an authn boundary
