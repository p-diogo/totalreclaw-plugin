# TotalReclaw

Zero-knowledge encrypted memory vault for AI agents. Your agent remembers -- only you can read it.

## What it does

TotalReclaw gives your AI agent persistent, encrypted memory that works across sessions and devices. Memories are encrypted on your device before they reach any server. Not even TotalReclaw can read your data.

- **True zero-knowledge E2EE** -- Client-side AES-256-GCM encryption. The server only sees encrypted blobs.
- **Portable** -- One-click plaintext export. No vendor lock-in.
- **Automatic** -- Memory extraction and recall happen via lifecycle hooks. No manual commands needed.
- **Cross-device** -- Same 12-word recovery phrase restores all your memories on any device.
- **98.1% recall** -- Blind-index search with BM25 + cosine + RRF fusion reranking.
- **Free tier** -- 100 writes/month, unlimited reads. Upgrade at [totalreclaw.xyz/pricing](https://totalreclaw.xyz/pricing).

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
- **Lost phrase**: Memories cannot be recovered. This is the zero-knowledge guarantee.

## Privacy and security

- All encryption happens client-side (AES-256-GCM + HKDF key derivation)
- The server stores only encrypted blobs and blind indices
- On-chain storage via Gnosis Chain (The Graph subgraph) -- fully auditable
- Master password never leaves your device
- One-click plaintext export -- no vendor lock-in

## Configuration

| Environment variable | Default | Description |
|---------------------|---------|-------------|
| `TOTALRECLAW_MASTER_PASSWORD` | *(required)* | 12-word BIP-39 recovery phrase |
| `TOTALRECLAW_SERVER_URL` | `https://api.totalreclaw.xyz` | Relay server URL |
| `TOTALRECLAW_SUBGRAPH_MODE` | `true` | Enable on-chain storage |
| `TOTALRECLAW_EXTRACT_EVERY_TURNS` | `5` | Turns between automatic extractions |

## Comparison

| Feature | TotalReclaw | Mem0 |
|---------|-------------|------|
| Encryption | Client-side (zero-knowledge) | Server-side (server can read) |
| Data portability | One-click plaintext export | No export |
| Key management | BIP-39 seed phrase (user-controlled) | Server-managed keys |
| Search method | Blind-index + encrypted reranking | Plaintext vector search |
| On-chain storage | Yes (Gnosis Chain subgraph) | No |
| Cross-device | Same seed = same memories | Tied to account |

The fundamental difference: with TotalReclaw, even a compromised server reveals nothing.

## Links

- [Website](https://totalreclaw.xyz)
- [Documentation](https://github.com/p-diogo/totalreclaw)
- [Pricing](https://totalreclaw.xyz/pricing)

## License

MIT
