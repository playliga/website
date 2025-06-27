# LIGA Esports Manager

[![Discord](https://img.shields.io/discord/1296858234853789826?style=for-the-badge&label=Join%20the%20Discord%20Server&link=https%3A%2F%2Fdiscord.gg%2FZaEwHfDD5N)](https://discord.gg/ZaEwHfDD5N)

This is the website source code for [LIGA Esports Manager](https://playliga.gg).

Uses the following APIs and technologies:

- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [Daisy UI](https://daisyui.com/)

## Getting Started

> [!IMPORTANT]
> A [Github Access Token](https://github.com/settings/tokens) is required.

```bash
# set github access token
echo -n "<YOUR_TOKEN_HERE>" >> .env.local

# run the app
npm install
npm run dev -- --host --open
```
