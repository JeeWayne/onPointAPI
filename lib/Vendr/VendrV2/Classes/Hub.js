const BaseClass = require("./BaseClass");
const Utils = new (require('../Utils'));
const User = require('./User');
const Tag = require('./Tag');
const Product = require('./Product');
const HubSettings = require('../PrivateClasses/HubSettings');

class Hub extends BaseClass {

    constructor(data, owner){
        super(data.HubId, data.client);
        Utils.APIKey = data.APIKey;
        Utils.HubId = data.HubId;

        this.GroupName = data.GroupName;
        this.ServerId = data.ServerId;
        this.HubType = data.HubType;
        this.TypeId = data.TypeId;
        this.CreatedAt = Utils.convertDateToTimestamp(data.CreatedAt);
        this.Owner = owner;
        this.Settings = new HubSettings(data.Settings);
        this.Tags = [];
        for (const tag of data.Tags){
            this.Tags.push(new Tag(tag));
        }
        this.Products = [];
        for(const product of data.Products){
            this.Products.push(new Product(product, data));
        }
    }
}

module.exports = Hub