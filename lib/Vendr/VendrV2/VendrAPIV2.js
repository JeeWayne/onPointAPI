const Utils = new (require('./Utils'));
const Classes = require('./Classes/Classes')
const VendrAPIError = require('./Errors/VendrAPIError')
const fetch = require('node-fetch');

class VendrAPIV2 {
    constructor(APIKey, HubId){
        this.APIKey = APIKey;
        this.HubId = HubId;
        Utils.APIKey = APIKey;
        Utils.HubId = HubId;
    }

    //Files

    async GetFile(ProductId){
        try{
            const data = await fetch(`https://api.onpointrblx.com/vendr/v2/files/getfile/${ProductId}?apitoken=${this.APIKey}`)
            return data.url
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
    }

    //Hubs

    async GetHubInfo(){
        try{
            const HubData = await Utils.makeRequest('hubs/getinfo', ['apitoken=apikey'])
            const UserData = await Utils.makeRequest(`users/getinfo/discord/${HubData.Owner.DiscordId}`, ['apitoken=apikey'])
            const hub = new Classes.Hub(HubData, UserData)
            return hub;
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
    }

    //Licences

    async GrantLicence(AccountType, AccountId, ProductId){
        if (typeof(AccountType) != "string"){
            Utils.ThrowVendrAPIError("AccountType must be a string.")
        }
        if (typeof(AccountId) != "string"){
            Utils.ThrowVendrAPIError("AccountId must be a string.")
        }
        if (typeof(ProductId) != "string"){
            Utils.ThrowVendrAPIError("ProductId must be a string.")
        }
        AccountType = AccountType.toLowerCase()
        if (AccountType != "roblox" && AccountType != "discord"){
            Utils.ThrowVendrAPIError("AccountType can only be 'roblox' or 'discord'.")
        }
        if(isNaN(AccountId)){
            Utils.ThrowVendrAPIError("AccountId can only contain numbers.")
        }

        try{
            const data = await Utils.makeRequest(`licences/grant/${AccountType}/${AccountId}/${ProductId}`, ['apitoken=apikey'], "POST")
            return data.LicenceGranted;
        }catch(err){
            return Utils.ThrowVendrAPIError(err);
        }
    }

    async RevokeLicence(AccountType, AccountId, ProductId){
        if (typeof(AccountType) != "string"){
            Utils.ThrowVendrAPIError("AccountType must be a string.")
        }
        if (typeof(AccountId) != "string"){
            Utils.ThrowVendrAPIError("AccountId must be a string.")
        }
        if (typeof(ProductId) != "string"){
            Utils.ThrowVendrAPIError("ProductId must be a string.")
        }
        AccountType = AccountType.toLowerCase()
        if (AccountType != "roblox" && AccountType != "discord"){
            Utils.ThrowVendrAPIError("AccountType can only be 'roblox' or 'discord'.")
        }
        if(isNaN(AccountId)){
            Utils.ThrowVendrAPIError("AccountId can only contain numbers.")
        }

        try{
            const data = await Utils.makeRequest(`licences/revoke/${AccountType}/${AccountId}/${ProductId}`, ['apitoken=apikey'], "DELETE")
            return !data.LicenceGranted;
        }catch(err){
            return Utils.ThrowVendrAPIError(err);
        }
    }

    async GetLicence(AccountType, AccountId, ProductName){
        if (typeof(AccountType) != "string"){
            Utils.ThrowVendrAPIError("AccountType must be a string.")
        }
        if (typeof(AccountId) != "string"){
            Utils.ThrowVendrAPIError("AccountId must be a string.")
        }
        if (typeof(ProductName) != "string"){
            Utils.ThrowVendrAPIError("ProductName must be a string.")
        }
        AccountType = AccountType.toLowerCase()
        if (AccountType != "roblox" && AccountType != "discord"){
            Utils.ThrowVendrAPIError("AccountType can only be 'roblox' or 'discord'.")
        }
        if(isNaN(AccountId)){
            Utils.ThrowVendrAPIError("AccountId can only contain numbers.")
        }

        try{
            const data = await Utils.makeRequest(`licences/getlicence/${AccountType}/${AccountId}/hubid/${encodeURIComponent(ProductName)}`)
            return true;
        }catch(err){
            if (err.Status && err.Status === 404 && err.Message && err.Message === "User does not own a license for this product."){
                return false;
            }
            return Utils.ThrowVendrAPIError(err);
        }
    }

    //Users

    async GetUser(AccountType, AccountId){
        if (typeof(AccountType) != "string"){
            Utils.ThrowVendrAPIError("AccountType must be a string.")
        }
        if (typeof(AccountId) != "string"){
            Utils.ThrowVendrAPIError("AccountId must be a string.")
        }
        AccountType = AccountType.toLowerCase()
        if (AccountType != "roblox" && AccountType != "discord"){
            Utils.ThrowVendrAPIError("AccountType can only be 'roblox' or 'discord'.")
        }
        if(isNaN(AccountId)){
            Utils.ThrowVendrAPIError("AccountId can only contain numbers.")
        }
        const data = await Utils.makeRequest(`users/getinfo/${AccountType}/${AccountId}`, ['apitoken=apikey']);
        return new Classes.User(data);
    }

}

module.exports = VendrAPIV2