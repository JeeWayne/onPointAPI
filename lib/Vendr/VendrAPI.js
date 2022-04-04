const fetch = require('node-fetch')
const Classes = require('./Classes/Classes');

class VendrAPI {
    
    constructor(APIKey, HubId){
        this.APIKey = APIKey;
        this.HubId = HubId;
    }

    //Licence

    async getLicence(ProductName, ClientType, Identification){
        if (typeof(ProductName) != "string"){
            return new Error("ProductName must be a string.")
        }
        if (typeof(ClientType) != "string"){
            return new Error("ClientType must be a string.")
        }
        if (typeof(Identification) != "string"){
            return new Error("Identification must be a string.")
        }
        
        ClientType = ClientType.toLowerCase()

        if (ClientType != "roblox" && ClientType != "discord"){
            return new Error('ClientType must be either "roblox" or "discord".')
        }

        if (isNaN(Identification)){
            return new Error("Identification cannot contain any words.")
        }
        
        let data;

        try{
            data = await this.makeRequest(`licences/getlicence/hubid/${ClientType}/${Identification}`, [`productName=${encodeURIComponent(ProductName)}`])
        }catch(err){
            throw new Error(err.Message || err)
        }
        

        //console.log(data)

        const Licence = new Classes.Licence()
        .setRobloxId(data.RobloxId)
        .setDiscordId(data.DiscordId)
        .setProductId(data.ProductId)
        .setProductName(data.ProductName)
        .setHubId(data.HubId)


        return Licence;
    }
    

    makeRequest(endpoint, params = [], manipulator){
        if (arguments.length === 2 && typeof(params) === 'function') {
            manipulator = params;
            params = [];
        }
        let paramsStr = ""
        if (params.length > 0){
            paramsStr = `?${params.join("&")}`
        }
        
        let Url = `https://api.onpointrblx.com/vendr/v1/${endpoint}/${paramsStr}`
        Url = Url.replace("apikey", this.APIKey).replace("hubid", this.HubId)
        return new Promise((resolve, reject) => {
            fetch(Url).then(data => {
                data.json().then(json => {
                    if (json.Status != 200){
                        reject(json)
                        return;
                    }
        
                    if (typeof(manipulator) === "function"){
                        resolve(manipulator(json));
                    }else{
                        resolve(json);
                    }
                }).catch(err => {
                    reject(err)
                    return;
                })
                
                
            }).catch(err => {
                reject(err)
                return;
            })

            

        })
    }
}

module.exports = VendrAPI