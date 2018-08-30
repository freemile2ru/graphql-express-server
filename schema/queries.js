// mutation {
//     addUser(firstName: "kudi", age: 19) {
//         firstName
//     }
// }


// query Users{
//     users{
//         username
//         email
//         id
//     }
// }


// query User{
//     companies{
//         id
//         name
//         users{
//             age
//         }
//     }
// }


// mutation updateUser($id: String!, $firstName: String) {
//     editUser(firstName: $firstName, id: $id) {
//         firstName
//         id
//     }
// }


// mutation deleteUser($id: String!) {
//     deleteUser(id: $id) {
//         firstName
//     }
// }