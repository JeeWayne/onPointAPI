

class Licence {

    constructor(makeRequest, APIKey){
        this.makeRequest = makeRequest;
        this.APIKey = APIKey;
    }

    setRobloxId(RobloxId){
        this.RobloxId = RobloxId
        return this;
    }

    setDiscordId(DiscordId){
        this.DiscordId = DiscordId
        return this;
    }

    setProductId(ProductId){
        this.ProductId = ProductId
        return this;
    }

    setProductName(ProductName){
        this.ProductName = ProductName
        return this;
    }

    setHubId(HubId){
        this.HubId = HubId
        return this;
    }
    
    async delete(ClientType = "roblox"){
        
        ClientType = ClientType.toLowerCase()

        if (ClientType != "roblox" && ClientType != "discord"){
            throw new Error('ClientType must be either "roblox" or "discord".')
        }

        let data;

        try{
            data = await this.makeRequest(`licences/removelicence/${ClientType}/${ClientType === "roblox" ? this.RobloxId : this.DiscordId}`, ['key=apikey', `productName="${encodeURIComponent(this.ProductName)}"`], "DELETE")
        }catch(err){
            throw new Error(err.Message || err)
        }

        return data.Message;

    }

}

module.exports = Licence;