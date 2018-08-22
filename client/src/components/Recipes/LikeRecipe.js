import React, {Component} from 'react'
import {Mutation} from 'react-apollo'

import {LIKE_RECIPE, GET_RECIPE, UNLIKE_RECIPE} from '../queries/'

class LikeRecipe extends Component {

    state = {
        liked: false
    }

    handleClick=(likeRecipe, unlikeRecipe) => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }), () => this.handlelike(likeRecipe, unlikeRecipe) )
    }

    handlelike=(likeRecipe, unlikeRecipe)=> {
        if (this.state.liked) {
            likeRecipe().then(async({data}) => {console.log(data)})
        } else {
            unlikeRecipe().then(async({data}) => {console.log(data)})
        }
    }

    updateLike = (cache, {data:{likeRecipe}}) => {
        const { _id }= this.props;
        const { getRecipe} = 
        cache.readQuery({
            query: GET_RECIPE, 
            variables:{ _id } 
        });
        cache.writeQuery({
            query:GET_RECIPE,
            variables: {_id},
            data: {
                getRecipe: {...getRecipe, likes: likeRecipe.likes + 1}
            }
        })
    }

    updateUnLike = (cache, {data:{unlikeRecipe}}) => {
        const { _id }= this.props;
        const { getRecipe} = 
        cache.readQuery({
            query: GET_RECIPE, 
            variables:{ _id } 
        });
        cache.writeQuery({
            query:GET_RECIPE,
            variables: {_id},
            data: {
                getRecipe: {...getRecipe, likes: unlikeRecipe.likes - 1}
            }
        })
    }



    render() {
        const {liked} = this.state;
        const {_id} = this.props;
        return (
            <Mutation 
            mutation={UNLIKE_RECIPE} 
            variables={{_id}}
            update={this.updateUnLike }
            >
                {(unlikeRecipe)=> (
                < Mutation 
                        mutation={LIKE_RECIPE} 
                        variables={{_id}}
                        update={this.updateLike }
                        >
                            {(likeRecipe)=>  (
                                <button className="like-button" onClick={()=>this.handleClick(likeRecipe,unlikeRecipe )}> 
                                { liked? 'unlike' : 'Like'}
                                </button>
                            )}
                    </Mutation>
                )} 

            </Mutation>
        )
}}




export default LikeRecipe