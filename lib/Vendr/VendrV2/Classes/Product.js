const BaseClass = require("./BaseClass");
const Tag = require('./Tag');
const Review = require('./Review');
const Utils = new (require('../Utils'));


class Product extends BaseClass {

    constructor(data, tagsList){
        Utils.APIKey = data.APIKey;
        Utils.HubId = data.HubId;
        super(data._id);
        this.Name = data.Name;
        this.Description = (data.Description === "None" ? undefined : data.Description);
        this.Image = (data.Image === "None" ? undefined : data.Image);
        this.DevProduct = data.DevProduct;
        this.TestGame = (data.TestGame === "None" ? undefined : data.TestGame);
        this.Stock = (data.Stock === "Unlimited" ? "Unlimited" : parseInt(data.Stock))
        this.Sale = data.Sale;
        this.Tags = [];
        for (const tagId of data.Tags){
            const ActualTag = tagsList.find(tag => tag._id === tagId)
            this.Tags.push(new Tag(ActualTag))
        }
        this.FileType = (data.FileType === "None" ? undefined : data.FileType);
        this.File = (data.File === "None" ? undefined : data.File);
        this.Reviews = [];
        for (const review of data.Reviews){
            this.Reviews.push(new Review(review));
        }
    }

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
}

module.exports = Product;