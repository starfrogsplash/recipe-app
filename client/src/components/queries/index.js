import {gql} from 'apollo-boost';


    export const GET_ALL_RECIPES = gql `
        query {
            getAllRecipes {
                _id
                name
                imageUrl
                category
                likes
            }
        }
        `

 export const GET_RECIPE = gql `
        query($_id:ID!){
            getRecipe(_id:$_id){
            _id
            name
            imageUrl
            category
            description
            instructions
            createdDate
            likes
            }
        }
    `

    export const SEARCH_RECIPES = gql`
    query($searchTerm: String) {
      searchRecipes(searchTerm: $searchTerm) {
        _id
        name
        likes
      }
    }
  `;


    export const ADD_RECIPE = gql `
    mutation(
        $name: String!
        $description: String!
        $category: String!
        $imageUrl: String!
        $instructions: String!
      ){
        addRecipe(
        name: $name
        imageUrl: $imageUrl
        description: $description
        category: $category
        instructions: $instructions
        ){
            _id
            name
            imageUrl
            category
            description
            instructions
            createdDate
            likes
            }
            }
    `

    export const DELETE_RECIPE = gql`
    mutation ($_id:ID!){
        deleteRecipe(_id:$_id){
            _id
        }
    }
    `

    export const LIKE_RECIPE = gql`
    mutation ($_id:ID!){
        likeRecipe(_id:$_id){
            _id
            likes
        }
    }
    `
    export const UNLIKE_RECIPE = gql`
    mutation ($_id:ID!){
        unlikeRecipe(_id:$_id){
            _id
            likes
        }
    }`

    export const GET_CURRENT_USER = gql `
        query {
            getCurrentUser {
                username
                joindDate
                email
            }
        }    
    `

export const SIGN_IN_USER = gql `
    mutation ($username:String!, $password: String!){
        signInUser(username:$username, password:$password){
        token
        }
    }
`  
 
export const SIGNUP_USER  = gql `
    mutation($username:String!, $email:String!, $password:String!){
        signupUser(username:$username, email:$email, password:$password){
        token
        }
    }

`;