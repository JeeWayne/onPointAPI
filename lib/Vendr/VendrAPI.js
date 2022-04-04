const fetch = require('node-fetch')
const Classes = require('./Classes/Classes');

class VendrAPI {
    
    constructor(APIKey, HubId){
        this.APIKey = APIKey;
        this.HubId = HubId;
    }

    //Licence

    async GetLicence(ProductName, ClientType, Identification){
        if (typeof(ProductName) != "string"){
            throw new Error("ProductName must be a string.")
        }
        if (typeof(ClientType) != "string"){
            throw new Error("ClientType must be a string.")
        }
        if (typeof(Identification) != "string"){
            throw new Error("Identification must be a string.")
        }
        
        ClientType = ClientType.toLowerCase()

        if (ClientType != "roblox" && ClientType != "discord"){
            throw new Error('ClientType must be either "roblox" or "discord".')
        }

        if (isNaN(Identification)){
            throw new Error("Identification cannot contain any words.")
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

    async CreateLicence(ProductName, ClientType, Identification){
        
        if (typeof(ProductName) != "string"){
            throw new Error("ProductName must be a string.")
        }
        if (typeof(ClientType) != "string"){
            throw new Error("ClientType must be a string.")
        }
        if (typeof(Identification) != "string"){
            throw new Error("Identification must be a string.")
        }
        
        ClientType = ClientType.toLowerCase()

        if (ClientType != "roblox" && ClientType != "discord"){
            throw new Error('ClientType must be either "roblox" or "discord".')
        }

        if (isNaN(Identification)){
            throw new Error("Identification cannot contain any words.")
        }

        let data;

        try{
            data = await this.makeRequest(`licences/createlicence/${ClientType}/${Identification}`, ['key=apikey', `productName="${encodeURIComponent(ProductName)}"`], "POST")
        }catch(err){
            throw new Error(err.Message || err)
        }


        const Licence = new Classes.Licence()
        .setRobloxId(data.RobloxId)
        .setDiscordId(data.DiscordId)
        .setProductId(data.ProductId)
        .setProductName(data.ProductName)
        .setHubId(data.HubId)


        return Licence;

    }

    DeleteLicence(license, ClientType = "roblox"){
        if (!license instanceof Classes.Licence){
            throw new Error("You need to pass a licence class object through this function. If you don't have one please just directly use the DeleteLicenceRequest function.")
        }

        ClientType = ClientType.toLowerCase()

        if (ClientType != "roblox" && ClientType != "discord"){
            throw new Error('ClientType must be either "roblox" or "discord".')
        }

        return this.DeleteLicenceRequest(license.ProductName, ClientType, (ClientType === "roblox" ? license.RobloxId : ClientType.DiscordId))
    }


    //Manual functions
    
    async DeleteLicenceRequest(ProductName, ClientType, Identification){

        if (typeof(ProductName) != "string"){
            throw new Error("ProductName must be a string.")
        }
        if (typeof(ClientType) != "string"){
            throw new Error("ClientType must be a string.")
        }
        if (typeof(Identification) != "string"){
            throw new Error("Identification must be a string.")
        }
        
        ClientType = ClientType.toLowerCase()

        if (ClientType != "roblox" && ClientType != "discord"){
            throw new Error('ClientType must be either "roblox" or "discord".')
        }

        if (isNaN(Identification)){
            throw new Error("Identification cannot contain any words.")
        }

        let data;

        try{
            data = await this.makeRequest(`licences/removelicence/${ClientType}/${Identification}`, ['key=apikey', `productName="${encodeURIComponent(ProductName)}"`], "DELETE")
        }catch(err){
            throw new Error(err.Message || err)
        }

        return data.Message;

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
        
        let Url = `https://api.onpointrblx.com/vendr/v1/${endpoint}/${paramsStr}`
        Url = Url.replace("apikey", this.APIKey).replace("hubid", this.HubId)
        return new Promise((resolve, reject) => {
            fetch(Url, {
                method: method
            }).then(data => {
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