[![Discord](https://img.shields.io/discord/1296858234853789826?style=for-the-badge&label=Join%20the%20Discord%20Server&logo=discord&logoColor=white)](https://discord.gg/ZaEwHfDD5N)

[![Download](https://img.shields.io/badge/download-latest-salmon?style=for-the-badge&logo=github)](https://playliga.gg/#/#download)

[![Roadmap](https://img.shields.io/badge/view_the-roadmap-blue?style=for-the-badge&logo=rocket&logoColor=white)](https://github.com/playliga/prototype/milestones)

This is the website source code for [LIGA Esports Manager](https://playliga.gg).

Uses the following APIs and technologies:

- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [Daisy UI](https://daisyui.com/)

# Getting Started

> [!IMPORTANT]
> A [Github Access Token](https://github.com/settings/tokens) is required.

```bash
# set github access token
echo -n "<YOUR_TOKEN_HERE>" >> .env.local

# run the app
npm install
npm run dev -- --host --open
```
