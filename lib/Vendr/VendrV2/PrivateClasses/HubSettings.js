
class HubSettings {

    constructor(data){
        this.ActionLogs = (data.ActionLogs === "Disabled" ? false : data.ActionLogs);
        this.PurchaseLogs = (data.PurchaseLogs === "Disabled" ? false : data.PurchaseLogs);
        this.Description = (data.Description === "None" ? undefined : data.Description);
        this.HubGame = (data.HubGame === "None" ? undefined : data.HubGame);
        this.StaffRole = (data.StaffRole === "Disabled" ? false : data.StaffRole);
        this.Color = data.Color;
        this.Terms = (data.Terms === "None" ? undefined : data.Terms);
    }
}

module.exports = HubSettings;