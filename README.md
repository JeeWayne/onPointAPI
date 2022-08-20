
<div align="center">
  <br />
  <p>
    <a href="https://onpointrblx.com"><img src="https://i.imgur.com/5SBIYK5.png" width="546" alt="onPoint" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/djs"><img src="https://img.shields.io/discord/562017478289653763?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
  </p>
</div>

# onPoint API

A NodeJS wrapper for the [onPoint API](https://onpointrblx.com/developers/vendr).

```js
const onPointAPI = require('onpoint-api');

const VendrAPI = new onPointAPI.VendrAPI("ApiKey", "HubId")
```

# Installation

```js
$ npm install onpoint-api
```

## Example Usage

```js
const onPointAPI = require('onpoint-api');

//VendrAPI
const VendrAPI = new onPointAPI.VendrAPI("APIKey", "HubID")

//Files
VendrAPI.GetFile("123aa345") //Returns the url of the product with the id of 123aa345's file.

//Hub
VendrAPI.GetHubInfo() //Returns a Hub class with the information of your hub.

//Users
VendrAPI.GetUser("discord", "12345678910111213") //Returns a User class which the Discord Id is 12345678910111213.
VendrAPI.GetUser("roblox", "1234567") //Returns a User class which the Roblox Id is 1234567.

//Licences
VendrAPI.GetLicence("roblox", "1234567", "123aa345") //Checks if a roblox user with the id of 1234567 owns a licence.
VendrAPI.GrantLicence("discord", "12345678910111213", "123aa345") //Grants a licence to a discord user with the id of 12345678910111213.
VendrAPI.RevokeLicence("roblox", "1234567", "123aa345") //Revokes a licence from the Roblox user with the id of 1234567.
```

## List of Functions (API Endpoints)

### GetFile(ProductId)
Returns a URL of the file of a product with the id you gave.

### GetHubInfo()
Returns a hub class.

### GrantLicence(AccountType, AccountId, ProductId)
Grants a licence of the product with the id you gave to the user with the information you provided.

### RevokeLicence(AccountType, AccountId, ProductId)
Revokes a licence of the product with the id you gave from the user with the information you provided.

### GetLicence(AccountType, AccountId, ProductName)
Checks if the user with the information you provided owns the product with the name you gave.

### GetUser(AccountType, AccountId)
Returns a user class with the information you gave.

# Classes
Custom made classes used by the package.

## Hub

```js
{
  id: "", //The id of the hub.
  GroupName: "", //The name of the hub.
  ServerId: "0", //The server if of the hub.
  HubType: "Group" || "User", //The type of the hub.
  TypeId: "0", //The type's id of the hub.
  CreatedAt: 0, //The timestamp when the hub was created.
  Owner: UserClass || "0", //The owner of the hub.
  Settings: HubSettingsClass, //The settings of the hub.
  Tags: [TagClass], //The tags in the hub.
  Products: [ProductClass] //The products in the hub.
}
```

### HubSettings

```js
{
  ActionLogs: false || "0", //The channel where action logs will be sent to.
  PurchaseLogs: false || "0", //The channel where purchase logs will be sent to.
  Description: undefined || "", //The hub's description.
  HubGame: undefined || "0", //The hub game's id.
  StaffRole: false || "0", //The staff role of the hub.
  Color: "", //The color theme of the hub.
  Terms: undefined || "" //The terms and conditions of the hub.
}
```

## User

```js
{
  id: "", //The user's account id.
  DiscordId: "0", //The Discord Id of the user.
  RobloxId: "0", //The Roblox Id of the user.
  VendrTier: "Free" || "Premium" || "Ultimate", //The tier of Vendr the user owns.
  Licences: [LicenceClass], //The licences the user owns.
  CreatedAt: 0 //The timestamp when the account was created.
}
```
The User class also has the following functions.
```js

UserClass.GrantLicence(ProductId)

```

## Licence

```js
{
  Hub: "", //The id of the licence's hub.
  Product: ProductClass || "", //The id of the licence's product.
  CreatedAt: 0 //The timestamp when the licence was created.
}
```
The Licence class also has the following function.
```js

UserClass.GrantLicence(ProductId) //Grants the product's licence to a user. Returns true or errors if it failed.
UserClass.RevokeLicence(ProductId) //Revokes the product's licence from a user. Returns true or errors if it failed.
UserClass.GetLicence(ProductName) //Checks if a user owns a licence of the product. Returns true or false.

```

## Product

```js
{
  id: "", //The product's id.
  Name: "", //The name of the product.
  Description: undefined || "", //The description of the product.
  Image: undefined || "0", //The image of the product.
  DevProduct: "Free" || "0", //The developer product of the product.
  TestGame: undefined || "0", //The testing game of the product.
  Stock: "Unlimited" || 0, //The stock of the product.
  Sale: true || false, //Whether or not the product is on sale.
  Tags: [TagClass], //The tags of the product.
  FileType: undefined || "File" || "Text" || "Link", //The file type of the product.
  File: undefined || "", //The product's file.
  Reviews: [ReviewClass] //The reviews of the product.
}
```
The product class also has the following functions.
```js

ProductClass.GrantLicence(AccountType, AccountId) //Grants the product's licence to a user. Returns true or errors if it failed.
ProductClass.RevokeLicence(AccountType, AccountId) //Revokes the product's licence from a user. Returns true or errors if it failed.
ProductClass.GetLicence(AccountType, AccountId) //Checks if a user owns a licence of the product. Returns true or false.

ProductClass.GetFile() //Returns a URL of the file of the product.
```

## Tag

```js
{
  id: "", //The tag's id.
  Name: "", //The name of the tag.
  Color: "" //The color of the tag.
}
```

## Review

```js
{
  id: "", //The review's id.
  Rating: 0, //The rating of the review.
  Comment: undefined || "", //The comment of the review.
  User: "0", //The roblox id of the user who made the review.
  CreatedAt: 0, //The timestamp when the review was created.
  Reports: [ReportClass] //The reports the review has.
}
```

## Report

```js
{
  id: "", //The report's id.
  User: "0" //The roblox id of the user who reported.
}
```
