require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const port = 3000

// Declare a route
fastify.register(require('./routes/products-route'));

// Run the server!
fastify.listen({ port }, (err) => {
    console.log(`Server has started listening at the port ${port}`);
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})