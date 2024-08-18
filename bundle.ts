import path from 'node:path';
import fs from 'node:fs/promises';
import { $ } from 'bun';
const nextStaticPath = path.join(__dirname, '.next', 'static');
const publicPath = path.join(__dirname, 'public');
const distPath = path.join(__dirname, 'dist');
const standalonePath = path.join(__dirname, '.next', 'standalone');
const prismaPath = path.join(__dirname, 'prisma');
// const
// const serverShimPath = path.join(__dirname, 'bun-server-shim.js');
async function main() {
  try {
    await fs.rm(distPath, { recursive: true, force: true });

    // const fileContent = await fs.readFile(`${standalonePath}/server.js`, 'utf-8');
    // await Bun.write(`${standalonePath}/server.js`, `require('./bun-server-shim.js')\n${fileContent}`);
    await $`cp -r ${standalonePath} ${distPath}/ && cp -r ${publicPath} ${distPath}/ && cp -r ${nextStaticPath} ${distPath}/.next/ && cp -r ${prismaPath} ${distPath}/prisma`;
  } catch (error) {
    console.error(error);
  }
}

main();
