let express_graphql = require('express-graphql');
let { root, schema } = require('../models/graphql.model');
const FormatError = require('easygraphql-format-error')
 
const formatError = new FormatError()
const errorName = formatError.errorName

module.exports = app => {

  app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: errorName,
    customFormatErrorFn: (err) => {
      return formatError.getError(err)
    }


  }))

}