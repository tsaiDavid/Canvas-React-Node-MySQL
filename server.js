// import * as express from 'express';
// import * as fs from 'fs';
// import * as mysql from 'mysql';
// import * as path from 'path';
// import * as graphql from 'graphql';

const express = require("express");
const fs = require("fs");
const mysql = require("mysql");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require("graphql");
const joinMonster = require("join-monster").default;

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
console.log("NODE_ENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // Return the main index.html, so react-router render the route in the client
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("client/build", "index.html"));
  });
}

const host = "localhost";
const user = "root";
const pswd = "";
const dbname = "employees";

let knex = require("knex")({
  client: "mysql",
  connection: {
    host: host,
    user: user,
    password: pswd,
    port: 3306,
    database: dbname
  }
});

const COLUMNS = ["last_name", "first_name"];

const userType = new GraphQLObjectType({
  name: "User",
  sqlTable: "users",
  uniqueKey: "id",
  fields: {
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString }
  }
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: {
      type: userType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: function(parent, args, context, resolveInfo) {
        return knex.select().from('users').where('id', '=', args.id).then((rows) => {
          return {
            id: rows[0].id,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name
          }
        })
      }
    },
    users: {
      type: new GraphQLList(userType),
      resolve: function(parent, args, context, resolveInfo) {
        return knex
          .select()
          .from("users")
          .then(rows => {
            return rows;
          });
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: queryType
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
