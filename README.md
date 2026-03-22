# TotalReclaw

End-to-end encrypted memory for AI agents — portable, yours forever.

## What it does

TotalReclaw gives your AI agent persistent, encrypted memory that works across sessions and devices. Memories are encrypted on your device before they reach any server. Not even TotalReclaw can read your data.

- **End-to-end encrypted** -- Client-side AES-256-GCM encryption. The server only sees encrypted blobs.
- **Portable** -- One-click plaintext export. No vendor lock-in.
- **Automatic** -- Memory extraction and recall happen via lifecycle hooks. No manual commands needed.
- **Cross-device** -- Same 12-word recovery phrase restores all your memories on any device.
- **98.1% recall** -- Blind-index search with BM25 + cosine + RRF fusion reranking.
- **Free tier available** -- Generous free tier included. See [pricing](https://totalreclaw.xyz/pricing) for details.

## Install

### OpenClaw (recommended)

```
openclaw plugins install @totalreclaw/totalreclaw
```

Or just ask your OpenClaw agent:
> "Install the totalreclaw plugin"

The plugin sets itself up on first run -- it will ask if you have an existing recovery phrase or need a new one.

### Other MCP-compatible agents

TotalReclaw also ships a standalone MCP server for Claude Desktop, Cursor, and others. See [totalreclaw.xyz](https://totalreclaw.xyz) for setup instructions.

## How it works

1. **Install** -- Add the plugin and set a recovery phrase (12-word BIP-39 mnemonic).
2. **Talk normally** -- TotalReclaw automatically extracts facts, preferences, and decisions from your conversations, encrypts them client-side, and stores them on-chain.
3. **Recall** -- At the start of each new conversation, relevant memories are decrypted and injected into context. You can also search explicitly with the `totalreclaw_recall` tool.
4. **Export anytime** -- `totalreclaw_export` dumps all your memories as plaintext JSON or Markdown. Your data, your format.

## Tools

| Tool | What it does |
|------|-------------|
| `totalreclaw_remember` | Store a fact, preference, or decision |
| `totalreclaw_recall` | Search and retrieve relevant memories |
| `totalreclaw_forget` | Delete a specific memory (on-chain tombstone) |
| `totalreclaw_export` | Export all memories as plaintext |
| `totalreclaw_status` | Check subscription tier and quota |
| `totalreclaw_import_from` | Import memories from Mem0, MCP Memory Server, or other tools |
| `totalreclaw_generate_recovery_phrase` | Generate a secure 12-word BIP-39 mnemonic (onboarding) |

## Lifecycle hooks

| Hook | When | What |
|------|------|------|
| `before_agent_start` | Every conversation | Recalls relevant memories and injects them into context |
| `agent_end` | After each turn | Extracts new facts from the conversation |
| `pre_compaction` | Before context compaction | Full memory extraction to prevent data loss |

## Recovery phrase

Your recovery phrase is a 12-word BIP-39 mnemonic -- like a crypto wallet seed. It derives all encryption keys locally. The server never sees it.

- **New user**: The plugin generates a random phrase and displays it once. Save it somewhere safe.
- **Returning user**: Enter your existing phrase to restore all your memories on a new device.
- **Lost phrase**: Memories cannot be recovered. This is the end-to-end encryption guarantee.

## Privacy and security

- All encryption happens client-side (AES-256-GCM + HKDF key derivation)
- The server stores only encrypted blobs and blind indices
- On-chain storage via Gnosis Chain (The Graph subgraph) -- fully auditable
- Recovery phrase never leaves your device
- One-click plaintext export -- no vendor lock-in

## Configuration

| Environment variable | Default | Description |
|---------------------|---------|-------------|
| `TOTALRECLAW_RECOVERY_PHRASE` | *(required)* | 12-word BIP-39 recovery phrase |
| `TOTALRECLAW_SERVER_URL` | `https://api.totalreclaw.xyz` | Relay server URL |
| `TOTALRECLAW_SUBGRAPH_MODE` | `true` | Enable on-chain storage |
| `TOTALRECLAW_EXTRACT_EVERY_TURNS` | `5` | Turns between automatic extractions |

## How TotalReclaw compares

Every AI memory tool stores your data on a server that can read it. TotalReclaw is the only one that encrypts on your device first -- a compromised server reveals nothing.

| | TotalReclaw | Mem0 | Zep | Letta | MemoClaw | MCP Memory | memU |
|---|---|---|---|---|---|---|---|
| **Server sees plaintext** | Never | Yes | Yes | Yes | Yes | N/A (local) | Yes |
| **Client-side E2EE** | AES-256-GCM | No | No | No | No | No | No |
| **Cross-device sync** | Seed phrase | Account | Account | Account | Wallet | No | Account |
| **Data export** | One-click plaintext | JSON (7-day link) | No | Via API | No | Copy file | No |
| **On-chain storage** | Gnosis Chain | No | No | No | Payments only | No | No |
| **Self-hostable** | Yes | Yes | No | Yes | No | Yes (local) | Yes |
| **Open source** | Yes (full) | Yes (client+server) | Partial (Graphiti) | Yes | Partial (SDK only) | Yes | Yes |
| **OpenClaw plugin** | Yes | Yes | No | No | Yes | No | Yes |
| **MCP server** | Yes | Yes | No | No | Yes | Yes | No |
| **Knowledge graph** | No | Yes ($249/mo) | Yes | Yes | No | Simple | No |
| **Free tier** | [Generous](https://totalreclaw.xyz/pricing) | 10K memories | 1K credits | 3 agents | 100 calls | Unlimited | Varies |

### Where TotalReclaw wins

- **End-to-end encryption** -- No other memory tool encrypts client-side. Mem0 and Zep offer SOC 2 and HIPAA, but their servers still process your plaintext. TotalReclaw's server only ever sees encrypted blobs.
- **Seed-phrase portability** -- One 12-word phrase, any device, any agent. No accounts, no passwords, no vendor. Works like a crypto wallet.
- **On-chain anchoring** -- Memories are stored on Gnosis Chain and indexed by The Graph. No single server controls your data.
- **True data ownership** -- One-click plaintext export. No 7-day expiry links, no API-only access. Your data, your format.

### What about MemoClaw?

MemoClaw shares the crypto-native ethos -- wallet auth, USDC payments on Base. But the similarity is surface-level. MemoClaw uses crypto for *identity and payments*; TotalReclaw uses it for *data sovereignty*. MemoClaw's server stores your memories in plaintext on closed-source infrastructure (the SDK is MIT, but the server code is proprietary and not self-hostable). You're trusting a single operator with your data -- the same model as any other cloud service, just with a wallet instead of a password.

### Where others win

- **Knowledge graphs** -- Zep's temporal graph tracks how facts evolve over time. Mem0's graph memory ($249/mo) maps entity relationships. TotalReclaw can't build graphs because the server can't read the data -- that's the privacy trade-off.
- **Ecosystem maturity** -- Mem0 has 49K GitHub stars, $24M in funding, and integrations with every major framework. TotalReclaw is a beta product.
- **Offline simplicity** -- The official MCP Memory Server and Engram need zero network, zero accounts, zero setup. Good enough for single-device use.
- **Enterprise compliance** -- Mem0 and Zep offer SOC 2, HIPAA, RBAC, SSO. TotalReclaw doesn't need most of these (E2EE means there's nothing to comply about), but enterprises want the paperwork.

## Links

- [Website](https://totalreclaw.xyz)
- [Documentation](https://github.com/p-diogo/totalreclaw)
- [Pricing](https://totalreclaw.xyz/pricing)

## License

MIT
