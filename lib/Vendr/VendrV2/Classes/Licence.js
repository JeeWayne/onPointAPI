const BaseClass = require("./BaseClass");
const Product = require('./Product');
const Utils = new (require('../Utils'));


class Licence extends BaseClass {

    constructor(data){
        super(data._id);
        this.Hub = data.Hub;
        this.Product = data.Product;
        this.CreatedAt = Utils.convertDateToTimestamp(data.CreatedAt);
    }

}

module.exports = Licence;