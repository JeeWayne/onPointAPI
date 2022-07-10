const fetch = require('node-fetch')
const VendrAPIError = require('./Errors/VendrAPIError')

class Utils {

    constructor(APIKey, HubId, client){
        this.APIKey = APIKey;
        this.HubId = HubId;
        this.client = client;
    }

    makeRequest(endpoint, params = [], manipulator, method = "GET"){
        if (arguments.length === 2) {
            if (typeof(params) === "string"){
                manipulator = null;
                method = params;
                params = [];
            }else if (typeof(params) === "function"){
                manipulator = params;
                params = [];
            }
        }else if (arguments.length === 3 && typeof(manipulator) === "string"){
            method = manipulator;
            manipulator = null;
        }
        let paramsStr = ""
        if (params.length > 0){
            paramsStr = `?${params.join("&")}`
        }

        let Url = `https://api.onpointrblx.com/vendr/v2/${endpoint}/${paramsStr}`
        Url = Url.replace('apikey', this.APIKey).replace('hubid', this.HubId)

        return new Promise((resolve, reject) => {
            fetch(Url, {
                method: method
            }).then(data => {
                data.json().then(json => {
                    if (json.Status != 200){
                        return reject(json)
                    }

                    json.APIKey = this.APIKey;
                    json.HubId = this.HubId;
                    json.client = this.client;
        
                    if (typeof(manipulator) === "function"){
                        resolve(manipulator(json));
                    }else{
                        resolve(json);
                    }
                }).catch(err => {
                    return reject(err)
                })
                
                
            }).catch(err => {
                return reject(err)
            })

        })
    }

    convertDateToTimestamp(date){
        return Math.floor(new Date(date).getTime() / 1000)
    }

    ThrowVendrAPIError(err){
        throw new VendrAPIError(err.Message || err.message || err)
    }

    ThrowError(err){
        throw new Error(err.Message || err.message || err)
    }

}

module.exports = Utils;