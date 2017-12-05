// This package automatically parses JSON requests.
const bodyParser = require('body-parser')

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express')

const schema = require('./schema')

module.exports = {
    activate: function activate(ghost) {
    },
  setupRoutes: function setupRoutes(blogRouter) {
    blogRouter.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
    blogRouter.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  }
}
