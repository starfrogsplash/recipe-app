import React, {Component} from'react';
import {Mutation} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import CKEDITOR from 'react-ckeditor-component'

import {ADD_RECIPE, GET_ALL_RECIPES} from '../queries/index'
import Error from '../Error'

const initialState = {
    name: '',
    imageUrl: '',
    instructions: '',
    category: 'Breakfast',
    description: '',
    username: ''
}

class RecipeAdd extends Component {
    
    state = { ...initialState };

    clearState = () => {
      this.setState({ ...initialState });
    };

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event,addRecipe ) => {
        event.preventDefault()
        addRecipe().then(({data})=> {
            console.log(data)
        })
        this.clearState()
        this.props.history.push('/')
    }

    handleEditorChange= (event) => {
        const newContent = event.editor.getData();
        this.setState({ instructions:newContent })

    }

    validateForm = () => {
        const {name, instructions, imageUrl, category,description} = this.state
        const isInvalid = !name || !instructions || !category || !description || !imageUrl
        return isInvalid
    }

    updateCache = (cache, {data:{addRecipe}}) => {
       const { getAllRecipes } = cache.readQuery({query:GET_ALL_RECIPES})
       cache.writeQuery({
           query: GET_ALL_RECIPES,
           data: {
            getAllRecipes: [addRecipe, ...getAllRecipes]
           }
       }) 
    }

    render(){
     const {name, instructions, category,description, imageUrl} = this.state

    return (
        <Mutation mutation={ADD_RECIPE} 
        variables={{name, imageUrl, instructions,category,description}}
        update={this.updateCache}
        >
        {(addRecipe,{data, loading, error})=> {
            
        return (
        <div className="App">
         <h2> Add Recipe </h2>
        <form className="form" onSubmit={(event)=>this.handleSubmit(event, addRecipe)}>

            <input type="text" name="name" placeholder="Recipe Name" 
            onChange={this.handleChange} value={name}/>

            <input type="text" name="imageUrl" placeholder="Recipe Image" 
            onChange={this.handleChange} value={imageUrl}/>

            <select name="category" onChange={this.handleChange} value={category}>
                <option value="Breakfast"> Breakfast </option>
                <option value="Lunch"> Lunch </option>
                <option value="Dinner"> Dinner </option>
                <option value="Snack"> Snack </option>
            </select>

             <input type="text" name="description" placeholder="Add description" 
                onChange={this.handleChange} value={description}/>

                <label htmlFor="instructions">Add Instructions</label>
                    <CKEDITOR
                        name="instructions"
                        content={instructions}
                        events={{ change: this.handleEditorChange}}
                    />

                {/* <textarea  name="instructions" placeholder="Add Instructions"
                onChange={this.handleChange} value={instructions}/> */}

             <button disabled={loading || this.validateForm()} type="submit" className="button-primary" > Submit </button>

             {error && <Error error={error}/>}
         </form>
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

            `}</style>
        </div>
            )
     }}
    </Mutation>
)}}


export default withRouter(RecipeAdd)