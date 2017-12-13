// This package automatically parses JSON requests.
const bodyParser = require('body-parser')
var express     = require('express')

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express')
const schema = require('./schema')

module.exports = function graphqlRoutes(middleware) {
    var router = express.Router(),
        // Authentication for public endpoints
        authenticatePublic = [
            middleware.api.authenticateClient,
            middleware.api.authenticateUser,
            middleware.api.requiresAuthorizedUserPublicAPI,
            middleware.api.cors,
            middleware.api.prettyUrls
        ],
        // Require user for private endpoints
        authenticatePrivate = [
            middleware.api.authenticateClient,
            middleware.api.authenticateUser,
            middleware.api.requiresAuthorizedUser,
            middleware.api.cors,
            middleware.api.prettyUrls
        ];

    router.use('/graphql', authenticatePublic, graphqlExpress({ schema }));
    return router
}
