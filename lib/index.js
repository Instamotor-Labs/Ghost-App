// This package automatically parses JSON requests.
const bodyParser = require('body-parser')

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const { graphqlExpress } = require('apollo-server-express')
const schema = require('./schema')

module.exports = function(app) {
    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
}
