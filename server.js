const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const cors = require('cors');
const helmet = require('helmet');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if(req.method === 'OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// })

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-qpquf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() =>{
//     app.listen(8000)
// }).catch(err => {
//     console.log(err)
// })
mongoose.connect('mongodb://localhost/zero-bug', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => console.log(`Connected to Mongo on ${db.host}:${db.port}`));
db.on('error', (err) => {
    console.log(`Database error:\n${err}`)
});

app.listen(8000);