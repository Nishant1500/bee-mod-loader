# Bee Mod Parser

A Node.js Package To Get Metadata Of Fabric/Forge/Liteloader Mods. Used By Bee Launcher.

[![NPM Badge](https://nodei.co/npm/bee-mod-parser.png)](https://npmjs.com/package/the-module)

## Install

```sh
npm install bee-mod-parser
```

## Usage

```js
const BeeModParser = require('bee-mod-parser')

//{...}//
```

## API

### Fabric Mod Metadata

#### mod
Path Where The Fabric Mod Is Located

Type: `string`

#### Example

```js
const BeeModParser = require('bee-mod-parser')

const path = "mod" //Where The Mod Is Located..
const fabricMetaData = await BeeModParser.readFabricMod(mod);

console.log(fabricMetaData);
// Console Output
// {id:"xxxxxx",name:"xxxx",.....}
```

### Forge Mod Metadata

#### mod
Path Where The Forge Mod Is Located

Type: `string`

#### Example

```js
const BeeModParser = require('bee-mod-parser')

const path = "mod" //Where The Mod Is Located..
const forgeMetaData = await BeeModParser.readForgeMod(mod);

console.log(forgeMetaData);
// Console Output
// {id:"xxxxxx",name:"xxxx",.....}
```
