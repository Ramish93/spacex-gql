import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
let db;
await (async () => {
    // open the database
    db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });
})();
//create a table to insert post
const createPostTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS launch (
        id text PRIMARY KEY,
        title text
        )`;
    return db.run(query);
};
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.


  type Launch {
    id: String
    title: String
  }
  
  type DeleteLaunchResponse{
    id: String
  }

  input SaveLaunchInput{
    id: String!
    title: String!
 }

  type Query {
    launchs: [Launch]
  }
  type Mutation {
    saveLauch(launch:SaveLaunchInput): Launch,
    delteLauch (id:String): DeleteLaunchResponse
  }
`;
const resolvers = {
    Query: {
        launchs: () => {
            return db.all(`SELECT * FROM launch`);
        },
    },
    Mutation: {
        saveLauch: async (_, { launch }) => {
            console.log({ launch });
            await db.run("INSERT INTO launch (title, id) VALUES (?,?);", [
                launch.title,
                launch.id,
            ]);
            return db.get("SELECT id,title FROM launch WHERE id = ?", launch.id);
        },
        delteLauch: async (_, { id }) => {
            await db.run("DELETE FROM launch WHERE id = ?", id);
            return { id };
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
await createPostTable();
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
