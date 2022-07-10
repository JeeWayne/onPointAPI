const BaseClass = require("./BaseClass");
const ProductClass = require('./Product');
const Utils = new (require('../Utils'));


class Licence extends BaseClass {

    #ownerRobloxId;

    constructor(data, product, ownerRobloxId){
        super(data._id, data.client);
        this.Hub = data.Hub;
        if (product){
            this.Product = product;
        }else{
            this.Product = data.Product;
        }
        this.CreatedAt = Utils.convertDateToTimestamp(data.CreatedAt);
        this.#ownerRobloxId = ownerRobloxId;
    }


    /**
     * Revoke a licence from a user.
     * @param {string} AccountType The account type of the user. (Discord or Roblox)
     * @param {string} AccountId The id of the user.
     * @returns {Boolean} A boolean whether or not the licence was revoked.
     */
   async Revoke(){
        let Product = this.Product;
        if (!Product instanceof ProductClass){
            Product = await this.client.getProductFromCache(Product);
        }

        if (!Product){
            Utils.ThrowVendrAPIError("Product could not be found. Please use VendrAPI.RevokeLicence().")
        }

        try{
            const LicenceRevoked = await this.client.RevokeLicence("Roblox", this.#ownerRobloxId, Product.id)
            return LicenceRevoked;
        }catch(err){
            return Utils.ThrowVendrAPIError(err)
        }
    }
}

module.exports = Licence;