const { getProductSale } = require('../misc/products-helpers');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 });
const stripe = require('../stripe')

const getProductsList = async (request, reply) => {
    try {
        const productsLimit = 10
        const cacheId = 'productsList'
        // Проверяем наличие результатов запроса в кэше
        const cachedData = cache.get(cacheId);
        if (cachedData) {
            return cachedData;
        }

        const createProductsList = async (product) => {
            const productId = product.id
            const sale = await getProductSale(productId)

            return { ...product, sale }
        }

        const products = await stripe.products.list({ expand: ['data.default_price'], limit: productsLimit })
        const productsList = await Promise.all(products.data.map(createProductsList));

        const data = { ...products, data: productsList }

        cache.set(cacheId, data)

        return data
    } catch (error) {
        console.error('Ошибка при получении списка товаров из Stripe:', error);
        throw error;
    }
}

module.exports = { getProductsList };
