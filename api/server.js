const express = require('express');
const graphqlHTTP = require('express-graphql');
const helmet = require('helmet');
const cors = require('cors');
const mountRoutes = require('./routes');
const graphQLSchema = require('./models/graphql/');

const app = express();

module.exports = function({ APP_PORT, GRAPHQL_ENDPOINT }, NODE_ENV, client) {
  app
    .set('port', APP_PORT)
    .set('host', NODE_ENV === 'development' ? 'localhost' : 'spd-api.herokuapp.com')
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(helmet())
    .use(cors())
    .use(
      `/api/${GRAPHQL_ENDPOINT}`,
      graphqlHTTP({
        schema: graphQLSchema,
        graphiql: NODE_ENV === 'development',
        context: {
          client,
        },
      }),
    );
  mountRoutes(app);

  app.listen(app.get('port'), app.get('host'), () => {
    process.stdout.write(`Application running at: https://${app.get('host')}:${app.get('port')}\n`);
  });
};
