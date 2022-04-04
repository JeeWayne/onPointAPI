
<div align="center">
  <br />
  <p>
    <a href="https://onpointrblx.com"><img src="https://i.imgur.com/5SBIYK5.png" width="546" alt="onPoint" /></a>
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
VendrAPI.GetHubInfo() //Returns a HubInfo class of the hub.
VendrAPI.GetHubProducts() //Returns an array consisting of Product classes of each product in your hub.

//Licenses
VendrAPI.GetLicence("IFE", "roblox", "1234567") //Gets a Roblox user with the Roblox Id of 1234567's IFE licence. Will error if there is no licence.
VendrAPI.CreateLicence("Plane", "discord", "12345678910111213") //Creates a Plane licence for the Discord user with the id of 12345678910111213.
VendrAPI.DeleteLicence("Ship", "roblox", "1234567") //Deletes a ship licence from the Roblox user with the Roblox Id of 1234567.


```


