
<div align="center">
  <br />
  <p>
    <a href="https://onpointrblx.com"><img src="https://i.imgur.com/5SBIYK5.png" width="546" alt="onPoint" /></a>
  </p>
</div>

# onPoint API

A NodeJS wrapper for the [onPoint API](https://onpointrblx.com/developers/vendr).

```js
const onPointAPI = require('onpoint-api');

const VendrAPI = new onPointAPI.VendrAPI("ApiKey", "HubId")
```

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
VendrAPI.GetHubInfo() //Returns a HubInfo class of the hub.
VendrAPI.GetHubProducts() //Returns an array consisting of Product classes of each product in your hub.

//Licenses
VendrAPI.GetLicence("IFE", "roblox", "1234567") //Gets a Roblox user with the Roblox Id of 1234567's IFE licence. Will error if there is no licence.
VendrAPI.CreateLicence("Plane", "discord", "12345678910111213") //Creates a Plane licence for the Discord user with the id of 12345678910111213.
VendrAPI.DeleteLicence("Ship", "roblox", "1234567") //Deletes a ship licence from the Roblox user with the Roblox Id of 1234567.
```

## List of Functions (API Endpoints)

### GetUser(ClientType, Identification)
Returns a user with the information you gave.

### GetLinkCode(RobloxId)
Returns a code that you can use to link the Roblox Id.

### LinkUser(LinkCode, DiscordId)
Links the Discord user of the Discord Id with the code given.

### GetHubInfo()
Returns a HubInfo class (information of your hub).

### GetHubProducts()
Rerturns an array consisting of Product classes.

### GetLicence(ProductName, ClientType, Identification)
Returns a licence class if the user owns a licence. Errors if they don't

### CreateLicence(ProductName, ClientType, Identification)
Creates a licence for the user. Errors if they already have one.

### DeleteLicence(ProductName, ClientType, Identification)
Deletes a licence for the user. Errors if they don't have it in the first place.

# Classes
Custom made classes used by the package.

## User

```js
{
  RobloxId: "0",
  DiscordId: "0",
  DarkMode: false
}
```

## HubInfo

```js
{
  OwnerId: "0",
  HubId: "0",
  GroupId: "0"
}
```

## Product

```js
{
  ProductId: "",
  DevProduct: "0",
  Name: "",
  Sale: true,
  Stock: "Unlimited",
  TestGame: "None"
}
```

## Licence

```js
{
  RobloxId: "0",
  DiscordId: "0",
  ProductId: "",
  ProductName: "",
  HubId: "0"
}
```

The Licence class also has a function `delete()` to delete the licence. An example of it's usage is below.

```js

VendrAPI.GetLicence("Plane", "roblox", "1234567").then(licence => {

  licence.delete().then(res => console.log("Deleted licence."))

})

```
