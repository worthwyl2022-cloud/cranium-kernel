# Evidence — what a stranger can run

These commands are the product. Decks are not.

## TypeScript

```bash
npm ci
npm run lint
npm run verify:synapse
npx tsx scripts/miracle-memory-check.ts
```

`npm run lint` is `tsc --noEmit`. It is a typecheck, not a linter suite.

## Kotlin / Gradle

```bash
gradle test --no-daemon --stacktrace
```

CI on `main` currently runs that Gradle command in `.github/workflows/ci.yml`.
TypeScript checks run in `.github/workflows/ci-typescript.yml`.

## Implemented

- Authority evaluate → reduce path in `src/kernel/engine.ts`
- In-memory replay guard
- Local SHA-256
- Ed25519 sign/verify via WebCrypto in `src/governance/Signatures.ts` (test keys)
- Synapse admission / receipt-binding checks in `scripts/synapse-integration-check.ts`
- Miracle Memory journal (file if a path is provided, in-memory otherwise)

## Not claimed

- Production key custody, rotation, revocation, or HSM
- Durable replay index across process death (replay guard is in-memory)
- Equivalence proof between TypeScript and Kotlin trees
- That `src/data/auditReport50k.ts` is a live CI artifact (it is precompiled)
- `src/data/initialState.ts` value `sig_ed25519_core_98a72b` is
  non-cryptographic placeholder demo data, not a real Ed25519 signature

If a command is not in this file, it is not an acquisition claim.
