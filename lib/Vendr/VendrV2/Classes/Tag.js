const BaseClass = require("./BaseClass");


class Tag extends BaseClass {

    constructor(data){
        super(data._id);
        this.Name = data.Name;
        this.Color = data.Color;
    }

}

module.exports = Tag;