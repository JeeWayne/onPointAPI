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
}

module.exports = User;