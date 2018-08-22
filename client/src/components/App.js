import React, {Component} from 'react';
import { Query, Mutation }from 'react-apollo';
import posed from 'react-pose';
import {GET_ALL_RECIPES, DELETE_RECIPE} from './queries'
import RecipeItem from './Recipes/RecipeItem'
import Spinner from './Spinner';

const RecipeList = posed.ul({
  shown: {
    x: '0%',
    staggerChildren: 100
  },
  hidden: {
    x: '-100%'
  }
})

const handledelete = (deleteRecipe) => {
  const confirmDelete = window.confirm('Are you sure you want to delet this recipe?')
    if(confirmDelete){
      deleteRecipe().then(({data}) => {
        console.log(data)
      })
    }
}

class App extends Component {

  state = {
    on: false
  }


  componentDidMount() {
    setTimeout( this.slideIn ,200);
  }

  slideIn = () => {
    this.setState({on: !this.state.on})
  }


render(){
return(
      <div className="App">
       <h1 className="main-title"> 
        Find Recipes you <strong> Love </strong> 
       </h1>
        <Query query={GET_ALL_RECIPES}>
          {({data, loading, error}) => {
            if (loading) return <Spinner/>
            if (error) return <div> error </div>
           const { on } = this.state
            return (
              <div>
              {!data.getAllRecipes.length && (
                <p>
                  <strong>You have not added any recipes yet</strong>
                </p>
              )}
              <RecipeList 
                pose={on ? 'shown': 'hidden'}
                className="cards"
                > 
              {data.getAllRecipes.map(recipe => (
                <div key={ recipe._id} >
                <RecipeItem {...recipe} handledelete={this.handledelete}/>
                    <Mutation  
                      mutation={DELETE_RECIPE} 
                      variables={{_id: recipe._id}}
                      update={(cache, {data:{deleteRecipe}})=> {
                        const {getAllRecipes} = cache.readQuery({
                          query:GET_ALL_RECIPES
                        })
                      cache.writeQuery({
                        query:GET_ALL_RECIPES,
                        data: {
                          getAllRecipes: getAllRecipes.filter( 
                            recipe => recipe._id !== deleteRecipe._id
                          )
                        }
                      })
                    }}
                    >
                        {(deleteRecipe, attrs={})=>{
                          return (
                            <p className="card-text delete-button" onClick={()=>handledelete(deleteRecipe)}> 
                              {attrs.loading ? 'deleting...' : 'X' }
                            </p>
                          )
                        }}
                    </Mutation>
                  </div>
               ))} 
               </RecipeList>
               </div>
            )
          }
          }
         </Query>
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

                .cards {
                  display: grid;
                  margin: 1.5em 3em;
                  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                  grid-auto-rows: 150px;
                  grid-auto-flow: row dense;
                  grid-gap: 2em;
                  grid-auto-rows: 300px;
                }
                
          `}</style>
      </div>
 
    );
  }
}
export default App;
