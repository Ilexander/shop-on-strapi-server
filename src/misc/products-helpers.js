const stripe = require('../stripe')

const getProductPrices = async (productId) => {
    const prices = await stripe.prices.list({ product: productId });
    return prices.data;
}

const getProductSale = async (productId) => {
    const prices = await stripe.prices.list({ product: productId });
    const salePrice = (await prices.data.find(price => price.nickname === 'sale')) || null

    return salePrice;
}

module.exports = { getProductPrices, getProductSale }