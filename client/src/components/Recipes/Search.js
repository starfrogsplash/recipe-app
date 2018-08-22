import React, {Component} from 'react'
import {ApolloConsumer} from 'react-apollo'

import { SEARCH_RECIPES } from "../queries"
import SearchItem from './SearchItem'

class Search extends Component {
  state = {
    searchResults : []
  }

  handleChange = ({searchRecipes}) => {
      console.log(searchRecipes)
      this.setState({
        searchResults:searchRecipes
      })
  }


render(){

  const { searchResults} = this.state
 return(
  <div>
    <ApolloConsumer >
      {(client) => {
      return (
        <div className="App">
          <input 
            type='search'
            className="search"
            placeholder="Search for Recipes"
            onChange = { async (event)=> {
           event.persist();
           const { data } = await client.query({
              query: SEARCH_RECIPES,
              variables: {searchTerm: event.target.value}
            });
            this.handleChange(data)

          }}
          /> 
          <ul>
            {searchResults.map((recipe)=>
                <SearchItem key={recipe._id} {...recipe}/>
            )}
          </ul>
        </div>
      )
      }}
  </ApolloConsumer >
        <style jsx>{`

          .App {
            text-align: center;
          }

          p,
          li {
            font-size: 2rem;
          }

          ul {
            list-style: none;
          }

          input,
          select,
          textarea {
            padding: 0.4em 0.2em;
            font-size: 1.2rem;
          }

          .active {
            font-weight: bold;
          }

          .form {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          .delete-button {
            color: red;
            cursor: pointer;
          }

          .like-button {
            position: fixed;
            right: 1em;
            bottom: 1em;
            font-size: 2rem;
            background-color: #f15f79;
            color: white !important;
          }

          .search {
            font-size: 3rem;
            transition: width 0.2s ease-in;
            margin: 2em;
            width: 10em;
          }
          
          .search:focus {
            width: 12em;
          }
          
          .spinner {
            text-align: center;
            padding: 5em;
          }
      `}</style>
  </div>
)
}
}

export default Search