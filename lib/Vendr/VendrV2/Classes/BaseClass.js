const VendrAPI = require('../VendrAPIV2')

class BaseClass {

    /**
     * 
     * @param {string} id 
     * @param {VendrAPI} client 
     */
    constructor(id, client){
        this.id = id;
        this.client = client;
    }
}

module.exports = BaseClass