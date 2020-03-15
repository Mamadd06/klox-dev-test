
const Koa = require('koa');
const { readFileSync } = require('fs');
const { ApolloServer } = require('apollo-server-koa');

const countryService = require('./src/country/country.services').build();
const resolvers = require('./src/country/country.resolvers').build(countryService);
const typeDefs = readFileSync('src/country/type.graphql', 'utf8');


const server = new ApolloServer({
  introspection: true,
  playground: true,
  tracing: true,
  typeDefs,
  resolvers
});

const app = new Koa();
server.applyMiddleware({ app });

app.listen(3000);
console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
