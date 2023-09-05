import { users, produtos, createUser, getAllUsers, getAllProducts, createProduct, searchUserByName, searchProductsByName } from "./database"
import { TProduct, TUser } from "./types";

//---------------------------------------------------------------------------------------------------
//exercício 1
// console.table(users)
// console.table(produtos)



//variavel         //função
const allUsers = getAllUsers();
console.log(allUsers);

const allProduct = getAllProducts();
console.log(allProduct);


console.table(searchUserByName(users, 'barbie'))
console.table(searchProductsByName(produtos, 'tv Samsung'))