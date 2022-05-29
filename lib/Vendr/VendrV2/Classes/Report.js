const BaseClass = require('./BaseClass');

class Report extends BaseClass {

    constructor(data){
        super(data._id);
        this.User = data.User;
    }

}

module.exports = Report;