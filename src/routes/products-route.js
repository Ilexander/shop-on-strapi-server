const { getProductsList } = require('../controllers/products-controller');

const paymentRoutes = (fastify, options, done) => {
    fastify.get('/get-list', getProductsList);
    done();
}

module.exports = paymentRoutes;