const strapiSkey = process.env.STRAPI_SKEY
const stripe = require('stripe')(strapiSkey);


module.exports = stripe