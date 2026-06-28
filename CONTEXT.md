# Context & Vocabulary

Shared definitions for this repo. Proposals and specs use these terms exactly.

## Business

- **Midwess** — the team/company. Builds **durable infrastructure for agentic systems in Rust**.
  Contact: team@midwess.com · github.com/Midwess. Midwess does **not** sell "agents" — it sells
  the infrastructure agentic systems run on.
- **Positioning** — "durable infrastructure for agentic systems, in Rust." Landing copy must
  reflect this, not imply Midwess ships end-user agents.

## Projects (the real inventory)

- **worldant** — actively in-progress world runtime for agent-owned directories, durable
  workflows, reactive data, and typed remote-function packages. Docs at `/worldant`.
- **pglite-rs** — in-process PostgreSQL for Rust (embedded like SQLite, full Postgres SQL, async
  on any runtime). Published crate: `cargo add pglite-rs`. Docs at `/pglite-rs`.
- **PgPaw** — read-only Postgres cache + realtime (SSE) server. **Built on pglite-rs** (embeds it
  as a logical replica). `cargo install pgpaw` / `npm install -g pgpaw`. Docs at `/pgpaw`.
- **Bytover** — P2P file management + transfer. External site (https://bytover.com), no on-site docs.

## Content rules

- **Business-truth filter** — every content block added to the marketing site must map to a
  verifiable Midwess fact (a real project, a real code-level dependency, a published crate, a real
  number). If no honest version exists, the block is **cut, not faked**.
- **Dogfooding proof** — the truthful substitute for third-party testimonials: our own products
  depend on our own libraries in production. Canonical, verifiable instance: **PgPaw embeds
  pglite-rs** (stated in `src/content/docs/pgpaw/index.mdx`). Use this, not invented quotes/logos.
