
class VendrAPIError extends Error {

    constructor(msg){
        super(msg);
        this.name = "VendrAPIError";
        Error.captureStackTrace(this, VendrAPIError);
    }

}

module.exports = VendrAPIError;