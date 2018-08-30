const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql;


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:4000/companies/${parentValue.id}/users`).then((res)=> res.data)
            }
        }
    })   
}); 

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: { type: GraphQLInt },
        company: { 
            type: CompanyType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:4000/companies/${parentValue.companyId}`).then((res)=> res.data)
            }
         },
    }

});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args){
                return axios.get(`http://localhost:4000/users/${args.id}`).then((res)=> res.data)
            }

        },
        company: {
            type: CompanyType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args){
                return axios.get(`http://localhost:4000/companies/${args.id}`).then((res)=> res.data)
            }

        },
        companies: {
            type: new GraphQLList(CompanyType),
            args: {
                },
            resolve(parentValue, args){
                return axios.get(`http://localhost:4000/companies`).then((res)=> res.data)
            }

        },
        users: {
            type: new GraphQLList(UserType),
            args: {
                },
            resolve(parentValue, args){
                return axios.get(`http://localhost:4000/users`).then((res)=> res.data)
            }

        }
    }
})


const mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return axios.post(`http://localhost:4000/users`, args).then((res)=> res.data)
            } 
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args){
                return axios.delete(`http://localhost:4000/users/${args.id}`).then((res)=> res.data)
            } 
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args){
                const id = args.id;
                delete args.id;
                return axios.patch(`http://localhost:4000/users/${id}`, args).then((res)=> res.data)
            } 
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})