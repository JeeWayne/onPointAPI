const fetch = require('node-fetch')

class VendrAPI {
    
    constructor(APIKey, HubId){
        this.APIKey = APIKey;
        this.HubId = HubId;
    }

    
    

    makeRequest(endpoint, params = []){
        let paramsStr = ""
        if (params.length > 0){
            paramsStr = `?${params.join("&")}`
        }
        
        let Url = `https://api.onpointrblx.com/vendr/v1/${endpoint}/${paramsStr}`
        Url = Url.replace("apikey", this.APIKey).replace("hubid", this.HubId)
        return Url
    }
}

module.exports = VendrAPI