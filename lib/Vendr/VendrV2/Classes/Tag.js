const BaseClass = require("./BaseClass");


class Tag extends BaseClass {

    constructor(data){
        super(data._id, data.client);
        this.Name = data.Name;
        this.Color = data.Color;
    }

}

module.exports = Tag;