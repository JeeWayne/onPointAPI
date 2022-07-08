const Utils = new (require('./Utils'));
const Classes = require('./Classes/Classes')
const VendrAPIError = require('./Errors/VendrAPIError')
const fetch = require('node-fetch');

class VendrAPIV2 {
    /**
     * 
     * @param {string} APIKey The API key of your hub. 
     * @param {string} HubId Your hub's id.
     */
    constructor(APIKey, HubId){
        this.APIKey = APIKey;
        this.HubId = HubId;
        Utils.APIKey = APIKey;
        Utils.HubId = HubId;
        this.#ProductCache = [];
    }

    //Files

    /**
     * Get the file link of a product.
     * @param {string} ProductId The id of the product.
     * @returns {string} The link of the product's file.
     */
    async GetFile(ProductId){
        try{
            let Product = this.#ProductCache.find(p => p.id === ProductId)
            if (!Product){
                const hub = await this.GetHubInfo()
                Product = hub.Products.find(p => p.id === ProductId)
            }
            if (!Product){
                return Utils.ThrowVendrAPIError("Product not found.")
            }
            if (!Product.FileType || Product.FileType != "File"){
                return Utils.ThrowVendrAPIError("Product does not have a file.")
            }
            const data = await fetch(`https://api.onpointrblx.com/vendr/v2/files/getfile/${ProductId}?apitoken=${this.APIKey}`)
            return data.url
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
    }

    //Hubs

    /**
     * Get information about your hub.
     * @returns {Classes.Hub} Returns a hub class.
     */
    async GetHubInfo(){
        try{
            const HubData = await Utils.makeRequest('hubs/getinfo', ['apitoken=apikey'])
            const UserData = await Utils.makeRequest(`users/getinfo/discord/${HubData.Owner.DiscordId}`, ['apitoken=apikey'])
            const hub = new Classes.Hub(HubData, UserData)

            for (const product of hub.Products){
                this.ProductCache.push(product)
            }
            return hub;
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
    }

    //Licences

    /**
     * Grant a licence to a user.
     * @param {string} AccountType The account type of the user. (Discord or Roblox)
     * @param {string} AccountId The id of the user.
     * @param {string} ProductId The id of the product.
     * @returns {Boolean} A boolean whether or not the licence was granted.
     */
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

    /**
     * Revoke a licence from a user.
     * @param {string} AccountType The account type of the user. (Discord or Roblox)
     * @param {string} AccountId The id of the user.
     * @param {string} ProductId The id of the product.
     * @returns {Boolean} A boolean whether or not the licence was revoked.
     */
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

    /**
     * Check whether a user owns a licence.
     * @param {string} AccountType The account type of the user. (Discord or Roblox)
     * @param {string} AccountId The id of the user.
     * @param {string} ProductId The name of the product.
     * @returns {Boolean} A boolean whether or not the user owns a licence.
     */
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

    /**
     * Get information about a user.
     * @param {string} AccountType The account type of the user. (Discord or Roblox)
     * @param {string} AccountId The id of the user.
     * @returns {Classes.User} Returns a user class.
     */
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