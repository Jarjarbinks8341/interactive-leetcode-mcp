# Interactive LeetCode MCP (Fork)

> Fork of [SPerekrestova/interactive-leetcode-mcp](https://github.com/SPerekrestova/interactive-leetcode-mcp) with **note tools** added (get, update, delete per-problem notes on leetcode.com).

## What's Added

- **`get_note`** - Retrieve your note for a specific problem
- **`update_note`** - Create or update a note (supports markdown)
- **`delete_note`** - Delete a note

These use LeetCode Global's undocumented GraphQL note API (works on leetcode.com, not just CN).

## Setup

### 1. Install the MCP server

```bash
claude mcp add --transport stdio leetcode -- npx -y github:Jarjarbinks8341/interactive-leetcode-mcp
```

Restart Claude Code after adding.

### 2. Authenticate with LeetCode

On first use, tell Claude:

```
You: "Authorize with LeetCode"
```

Claude will open your browser and guide you to extract two cookies from LeetCode:

1. Log in to [leetcode.com](https://leetcode.com)
2. Open DevTools (F12) → Application (Chrome) or Storage (Firefox) → Cookies → `https://leetcode.com`
3. Copy the values of **`csrftoken`** and **`LEETCODE_SESSION`**
4. Paste them to Claude when prompted

Credentials are saved to `~/.leetcode-mcp/credentials.json` and typically last 7-14 days. Re-run the auth flow when they expire.

## Features

- AI-guided authentication and learning mode
- Problem search, daily challenges, editorial solutions
- Code submission with runtime/memory stats
- Per-problem notes (read, write, delete)
- User profile, submission history, contest rankings
- Multi-language support (Python, C++, Java, JavaScript, TypeScript, etc.)

## Acknowledgements

Forked from [SPerekrestova/interactive-leetcode-mcp](https://github.com/SPerekrestova/interactive-leetcode-mcp), which was forked from [jinzcdev/leetcode-mcp-server](https://github.com/jinzcdev/leetcode-mcp-server).

## License

MIT
