const BaseClass = require("./BaseClass");
const Licence = require('./Licence');
const Utils = new (require('../Utils'));

class User extends BaseClass{

    constructor(data){
        super(data.AccountId);
        //Utils.APIKey = data.APIKey;
        //Utils.HubId = data.HubId;
        
        this.DiscordId = data.DiscordId;
        this.RobloxId = data.RobloxId;
        this.VendrTier = data.VendrTier;
        if (data.Licences){
            this.Licences = [];
            for (const licence of data.Licences){
                this.Licences.push(new Licence(licence));
            }
        }
        this.CreatedAt = Utils.convertDateToTimestamp(data.CreatedAt);
    }
}

module.exports = User;