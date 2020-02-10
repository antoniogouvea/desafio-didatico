let express_graphql = require('express-graphql');
let { root, schema } = require('../models/graphql.model');

module.exports = app => {

  app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true

  }))

}