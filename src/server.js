const express = require("express");
const { PORT } = require("./config");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { ApolloServer } = require("apollo-server-express");

async function startNode() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: ({ req }) => {
      return { token: req.headers.authorization || "" };
    },
    formatError: (err) => {
      return err.message;
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(
      `Express GraphQL Server Now Running On localhost:${PORT}/graphql`
    )
  );
}

startNode();
