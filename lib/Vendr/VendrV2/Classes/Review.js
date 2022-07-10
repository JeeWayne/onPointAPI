const BaseClass = require("./BaseClass");
const Utils = new (require('../Utils'));
const Report = require('./Report');

class Review extends BaseClass {

    constructor(data){
        super(data._id, data.client);
        this.Rating = parseInt(data.Rating);
        this.Comment = (data.Comment === "None" ? undefined : data.Comment);
        this.User = data.User;
        this.CreatedAt = Utils.convertDateToTimestamp(data.CreatedAt);
        this.Reports = [];
        for (const report of data.Reports){
            this.Reports.push(new Report(report));
        }
    }

}

module.exports = Review;