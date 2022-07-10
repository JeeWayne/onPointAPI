const BaseClass = require("./BaseClass");
const Licence = require('./Licence');
const Utils = new (require('../Utils'));

class User extends BaseClass{

    constructor(data, licences){
        super(data.AccountId, data.client);
        //Utils.APIKey = data.APIKey;
        //Utils.HubId = data.HubId;
        
        this.DiscordId = data.DiscordId;
        this.RobloxId = data.RobloxId;
        this.VendrTier = data.VendrTier;
        this.Licences = licences;
        this.CreatedAt = Utils.convertDateToTimestamp(data.CreatedAt);
    }

    /**
     * Grant a licence to the user.
     * @param {string} ProductId The id of the product.
     * @returns {Boolean} A boolean whether or not the licence was granted.
     */
     async GrantLicence(ProductId){
        if (typeof(ProductId) != "string"){
            Utils.ThrowVendrAPIError("ProductId must be a string.")
        }

        try{
            const LicenceGranted = await this.client.GrantLicence("Roblox", this.RobloxId, ProductId)
            return LicenceGranted;
        }catch(err){
            return Utils.ThrowVendrAPIError(err);
        }
    }

    /**
     * Revoke a licence from the user.
     * @param {string} ProductId The id of the product.
     * @returns {Boolean} A boolean whether or not the licence was revoked.
     */
    async RevokeLicence(ProductId){
        if (typeof(ProductId) != "string"){
            Utils.ThrowVendrAPIError("ProductId must be a string.")
        }

        try{
            const LicenceRevoked = await this.client.RevokeLicence("Roblox", this.RobloxId, ProductId)
            return LicenceRevoked;
        }catch(err){
            return Utils.ThrowVendrAPIError(err);
        }
    }

    /**
     * Check whether the user owns a licence.
     * @param {string} ProductName The name of the product.
     * @returns {Boolean} A boolean whether or not the user owns a licence.
     */
    async GetLicence(ProductName){
        if (typeof(ProductName) != "string"){
            Utils.ThrowVendrAPIError("ProductName must be a string.")
        }

        try{
            const OwnLicence = await this.client.GetLicence("Roblox", this.RobloxId, ProductName)
            return OwnLicence;
        }catch(err){
            if (err.Status && err.Status === 404 && err.Message && err.Message === "User does not own a license for this product."){
                return false;
            }
            return Utils.ThrowVendrAPIError(err);
        }
    }
}

module.exports = User;