const BaseClass = require("./BaseClass");
const Utils = new (require('../Utils'));
const User = require('./User');
const Tag = require('./Tag');
const Product = require('./Product');
const HubSettings = require('../PrivateClasses/HubSettings');

class Hub extends BaseClass {

    constructor(data, userData){
        super(data.HubId);
        Utils.APIKey = data.APIKey;
        Utils.HubId = data.HubId;

        this.GroupName = data.GroupName;
        this.ServerId = data.ServerId;
        this.HubType = data.HubType;
        this.TypeId = data.TypeId;
        this.CreatedAt = Utils.convertDateToTimestamp(data.CreatedAt);
        if (!userData){
            this.Owner = data.Owner.DiscordId;
        }else{
            this.Owner = new User(userData);
        }
        this.Settings = new HubSettings(data.Settings);
        this.Tags = [];
        for (const tag of data.Tags){
            this.Tags.push(new Tag(tag));
        }
        this.Products = [];
        for(const product of data.Products){
            this.Products.push(new Product(product, data.Tags));
        }
    }
}

module.exports = Hub