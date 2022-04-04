
<div align="center">
  <br />
  <p>
    <a href="https://onpointrblx.com"><img src="https://i.imgur.com/5SBIYK5.png" width="546" alt="onPoint" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.onpointrblx.com/"><img src="https://img.shields.io/discord/562017478289653763?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/onpoint-api"><img src="https://img.shields.io/npm/v/onpoint-api.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/onpoint-api"><img src="https://img.shields.io/npm/dt/onpoint-api.svg?maxAge=3600" alt="npm downloads" /></a>
  </p>
</div>

# onPoint API

A NodeJS wrapper for the [onPoint API](https://onpointrblx.com/developers/vendr).

# Installation

```javascript
$ npm install onpoint-api
```

## Example Usage

```javascript
const onPointAPI = require('onpoint-api');

//VendrAPI
const VendrAPI = new onPointAPI.VendrAPI("APIKey", "HubID")

//Users
VendrAPI.GetUser("discord", "12345678910111213") //Returns a User class which the Discord Id is 12345678910111213.
VendrAPI.GetUser("roblox", "1234567") //Returns a User class which the Roblox Id is 1234567.

//Linking
VendrAPI.GetLinkCode("1234567") //Get the link code for a Roblox user with the id of 1234567.
VendrAPI.LinkUser("ts10106", "12345678910111213") //Link the Discord user with the id of 12345678910111213 with the link code which you can get with the GetLinkCode function.

//Hub

```


