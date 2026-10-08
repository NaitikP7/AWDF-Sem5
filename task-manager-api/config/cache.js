const NodeCache = require("node-cache");

// stdTTL: 60 seconds default cache TTL
const cache = new NodeCache({ stdTTL: 60 });

module.exports = cache;
