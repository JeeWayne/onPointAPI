//const VendrAPI = require('./lib/Vendr/VendrAPI');
const VendrAPIV1 = require('./lib/Vendr/VendrV1/VendrAPIV1');
const VendrAPIV2 = require('./lib/Vendr/VendrV2/VendrAPIV2');
const VendrAPI = require('./lib/Vendr/VendrV2/VendrAPIV2');

module.exports = {VendrAPI, VendrAPIV1, VendrAPIV2}