// @deno-types="npm:@types/express"
import express from "npm:express";
import { ApolloServer, gql } from "npm:apollo-server-express";
import { buildSubgraphSchema } from "npm:@apollo/subgraph";

const port = 8765;
const app = express();

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: gql`  
      extend type Query {
        hello: String!
      }`,
    resolvers: {
      Query: {
        hello: () => "world",
      },
    },
  }),
});
(async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  await server.start();
  server.applyMiddleware({ app });
  console.log(`App Started. Listening on Port ${8765}`);
})();

app.listen({ port });
