// @deno-types="npm:@types/express@4"
import express from "npm:express@4.18.2";
import { x } from "npm:graphql@16.6.0"; // currently graphql is not automatically imported but necessary to run
import { ApolloServer, gql } from "npm:apollo-server-express@3.10.3";
import { buildSubgraphSchema } from "npm:@apollo/subgraph@2.1.4";

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
