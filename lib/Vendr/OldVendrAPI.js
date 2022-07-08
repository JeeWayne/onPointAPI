const VendrAPIV1 = require('./VendrV1/VendrAPIV1')
const VendrAPIV2 = require('./VendrV2/VendrAPIV2')

const defaultOptions = {
    version: 'v2'
}

class VendrAPI {

    /**
     * @typedef {Object} VendrConstructorOptions
     * @property {string} version The version of the API to use.
     */

    /**
     * 
     * @param {string} APIKey Your Hub's API Key. 
     * @param {string} HubId Your Hub's id.
     * @param {VendrConstructorOptions} options Optional options parameter. 
     * @returns {VendrAPIV2}
     */

    constructor(APIKey, HubId, options = defaultOptions){
        if (options.version == 'v1'){
            return new VendrAPIV1(APIKey, HubId)
        }else if (options.version == 'v2'){
            return new VendrAPIV2(APIKey, HubId)
        }
    }
}

module.exports = VendrAPI