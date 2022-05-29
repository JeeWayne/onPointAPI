const defaultOptions = {

    version: 'v2'

}

const VendrAPIV1 = require('./VendrV1/VendrAPIV1')
const VendrAPIV2 = require('./VendrV2/VendrAPIV2')

class VendrAPI {

    constructor(APIKey, HubId, options = defaultOptions){
        if (options.version == 'v1'){
            return new VendrAPIV1(APIKey, HubId)
        }else if (options.version == 'v2'){
            return new VendrAPIV2(APIKey, HubId)
        }
    }
}

module.exports = VendrAPI