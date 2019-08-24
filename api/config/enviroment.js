module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  APP: {
    APP_PORT: process.env.APP_PORT,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  DATABASE: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
