'use strict';

const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

// =================
// type definitions and resolvers
// =================
const typeDefs = gql`
    type Query {
        usersRecommendedItems(username: String!): [Item!]!
        item(id: ID!): Item
    }

    type Item {
        id: ID!
        name: String!
        img: String!
        department: String!
        category: String!
        weight: String
        packagedWeight: String
        price: Float!
    }
`;

const resolvers = {

    Query: {
        usersRecommendedItems: async (parent , args, context, info) => {
            // extract needed arguments
            const { username } = args;
            // fetch the requested data from the data source
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/users/recommendations?username=${username}`
            );
            const listOfRecommendedItemIds = responseFromDataSource.data;
            const listOfRequestsToProceed = [];
            for(const itemId of listOfRecommendedItemIds) {
                //set up get request for item
                const requestFromDataSource = axios.get(
                    `http://localhost:3000/items?ids=${itemId}`
                );
                //push get request to array
                listOfRequestsToProceed.push(requestFromDataSource);
            }
            //use axios all for parallel fetching
            const listOfResponseFromDataSource=await axios.all(listOfRequestsToProceed);
            //return a list of data for each response
            const listOfDataFromSource=listOfResponseFromDataSource.map(item=>item.data[0]);
            // return the data
            return listOfDataFromSource;
        },
        item: async (parent, args, context, info) => {
            // extract needed arguments
            const { id } = args;
            // fetch the requested data from the data source
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/items?ids=${id}`
            );
            // return the data
            return responseFromDataSource.data[0];
        }
    }
};

// =================
// configure the server
// =================
const port = 4000;

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware({ app });

// =================
// start / turn-on the server
// =================
app.listen({ port }, () => {
    console.log(
        `Graphql endpoint is at http://localhost:${port}${apolloServer.graphqlPath}`
    );
});

