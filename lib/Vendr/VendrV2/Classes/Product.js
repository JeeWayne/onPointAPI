const BaseClass = require("./BaseClass");
const Tag = require('./Tag');
const Review = require('./Review');
const Utils = new (require('../Utils'));


class Product extends BaseClass {

    constructor(data, hubData){
        Utils.APIKey = data.APIKey;
        Utils.HubId = data.HubId;
        super(data._id, hubData.client);
        this.Name = data.Name;
        this.Description = (data.Description === "None" ? undefined : data.Description);
        this.Image = (data.Image === "None" ? undefined : data.Image);
        this.DevProduct = data.DevProduct;
        this.TestGame = (data.TestGame === "None" ? undefined : data.TestGame);
        this.Stock = (data.Stock === "Unlimited" ? "Unlimited" : parseInt(data.Stock))
        this.Sale = data.Sale;
        this.Tags = [];
        for (const tagId of data.Tags){
            const ActualTag = hubData.Tags.find(tag => tag._id === tagId)
            if (!ActualTag){
                this.Tags.push(tagId)
            }else{
                this.Tags.push(new Tag(ActualTag))
            }
        }
        this.FileType = (data.FileType === "None" ? undefined : data.FileType);
        this.File = (data.File === "None" ? undefined : data.File);
        this.Reviews = [];
        for (const review of data.Reviews){
            this.Reviews.push(new Review(review));
        }
    }

    /*
    async Grant(AccountType, AccountId){
        if (typeof(AccountType) != "string"){
            ThrowVendrAPIError("AccountType must be a string.")
        }
        if (typeof(AccountId) != "string"){
            ThrowVendrAPIError("AccountId must be a string.")
        }
        AccountType = AccountType.toLowerCase()
        if (AccountType != "roblox" && AccountType != "discord"){
            ThrowVendrAPIError("AccountType can only be 'roblox' or 'discord'.")
        }
        if(isNaN(AccountId)){
            ThrowVendrAPIError("AccountId can only contain numbers.")
        }

        try{
            const data = await Utils.makeRequest(`licences/grant/${AccountType}/${AccountId}/${this.id}`, ['apitoken=apikey'], "POST")
            return data.LicenceGranted;
        }catch(err){
            return Utils.ThrowVendrAPIError(err);
        }
        
    }

    async Revoke(AccountType, AccountId){
        if (typeof(AccountType) != "string"){
            ThrowVendrAPIError("AccountType must be a string.")
        }
        if (typeof(AccountId) != "string"){
            ThrowVendrAPIError("AccountId must be a string.")
        }
        AccountType = AccountType.toLowerCase()
        if (AccountType != "roblox" && AccountType != "discord"){
            ThrowVendrAPIError("AccountType can only be 'roblox' or 'discord'.")
        }
        if(isNaN(AccountId)){
            ThrowVendrAPIError("AccountId can only contain numbers.")
        }

        try{
            const data = await Utils.makeRequest(`licences/revoke/${AccountType}/${AccountId}/${this.id}`, ['apitoken=apikey'], "DELETE")
            return !data.LicenceGranted;
        }catch(err){
            return Utils.ThrowVendrAPIError(err);
        }
        
    }
    
    async GetLicence(AccountType, AccountId){
        if (typeof(AccountType) != "string"){
            ThrowVendrAPIError("AccountType must be a string.")
        }
        if (typeof(AccountId) != "string"){
            ThrowVendrAPIError("AccountId must be a string.")
        }
        AccountType = AccountType.toLowerCase()
        if (AccountType != "roblox" && AccountType != "discord"){
            ThrowVendrAPIError("AccountType can only be 'roblox' or 'discord'.")
        }
        if(isNaN(AccountId)){
            ThrowVendrAPIError("AccountId can only contain numbers.")
        }

        try{
            const data = await Utils.makeRequest(`licences/getlicence/${AccountType}/${AccountId}/hubid/${encodeURIComponent(this.Name)}`)
            return true;
        }catch(err){
            if (err.Status && err.Status === 404 && err.Message && err.Message === "User does not own a license for this product."){
                return false;
            }
            return Utils.ThrowVendrAPIError(err);
        }
        
        
    }
    */

    /**
     * Grant a licence to a user.
     * @param {string} AccountType The account type of the user. (Discord or Roblox)
     * @param {string} AccountId The id of the user.
     * @returns {Boolean} A boolean whether or not the licence was granted.
     */
   async Grant(AccountType, AccountId){
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

        try{
            const LicenceGranted = await this.client.GrantLicence(AccountType, AccountId, this.id)
            return LicenceGranted;
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
   }

   /**
     * Revoke a licence from a user.
     * @param {string} AccountType The account type of the user. (Discord or Roblox)
     * @param {string} AccountId The id of the user.
     * @returns {Boolean} A boolean whether or not the licence was revoked.
     */
   async Revoke(AccountType, AccountId){
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

        try{
            const LicenceRevoked = await this.client.RevokeLicence(AccountType, AccountId, this.id)
            return LicenceRevoked;
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
    }

    /**
     * Check whether a user owns a licence.
     * @param {string} AccountType The account type of the user. (Discord or Roblox)
     * @param {string} AccountId The id of the user.
     * @returns {Boolean} A boolean whether or not the user owns a licence.
     */
    async GetLicence(AccountType, AccountId){
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

        try{
            const Licence = await this.client.GetLicence(AccountType, AccountId, this.Name)
            return Licence;
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
    }

    /**
     * Get the file link of a product.
     * @param {string} ProductId The id of the product.
     * @returns {string} The link of the product's file.
     */
     async GetFile(){
        try{
            if (!this.FileType || this.FileType != "File"){
                return Utils.ThrowVendrAPIError("Product does not have a file.")
            }
            const data = await fetch(`https://api.onpointrblx.com/vendr/v2/files/getfile/${ProductId}?apitoken=${this.APIKey}`)
            return data.url
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
    }
}

module.exports = Product;