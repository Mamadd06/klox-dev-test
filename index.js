const Koa = require('koa');
const { ApolloServer } = require('apollo-server-koa');

const app = new Koa();
app.listen({ port: 3000 });

const server = new ApolloServer({
  // GraphQL playground will be available at http://localhost:3000/graphql/
  introspection: true,
  playground: true,
  tracing: true,
  // ...Apollo Server parameters
});
server.applyMiddleware({ app });

module.exports = server;
