### Guide

#### Client
1. Download [Genshin_0.7.1.zip](https://autopatchhk.yuanshen.com/client_app/pc_plus19/Genshin_0.7.1.zip).
2. Download [mhyprot2.sys](https://cdn.discordapp.com/attachments/824458553314115625/845786845984194561/mhyprot2.Sys) and paste it on Genshin_0.7.1 folder.

#### Proxy
1. Download and install [Fiddler](https://www.telerik.com/download/fiddler).
2. Click on FiddlerScript and put [fiddler script](https://github.com/okiwiziin/andromeda-ps/blob/main/FiddlerScript.cs) from andromeda repo.

#### Server
1. Clone the repository. <br />
`git clone https://github.com/okiwiziin/andromeda-ps.git`
2. Put the [resources](https://cdn.discordapp.com/attachments/735901158232686704/1056268861281935492/resources.zip) into "resources/" folder.
3. Copy `.env.example` to `.env`.
4. Install dependencies with `yarn` or `npm i`.
5. Run the server with `yarn dev` or `npm run dev`.
