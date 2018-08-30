const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

app.use('/graphql', expressGraphQL({ graphiql: true, schema }));


// // Mount GraphQL on /graphql
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers: resolvers()
// });

// app.use('/graphql', graphqlExpress({ schema }));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000, () => console.log('Express app listening on localhost:3000'));
