import React from 'react';
import {withRouter} from 'react-router-dom'
import { Query} from 'react-apollo'

import {GET_RECIPE} from '../queries/'
import LikeRecipe from './LikeRecipe'
import Spinner from '../Spinner';
import '../App.css';


const RecipePage = ({ match }) => {
    const { _id } = match.params;

    console.log(match.params)
    console.log(_id)
    
        return (
         <div className= "App">
            <Query query={GET_RECIPE} variables={{ _id }}>
                {({data, loading, error})=> {
                    console.log(data)
                    if (loading) return <Spinner/>;
                    if (error) return <div>Error</div>;
                    const {
                        category,
                        imageUrl, 
                        name, 
                        createdDate, 
                        description, 
                        instructions,
                        likes 
                    } = data.getRecipe
                    return (
                        <div> Recipe
                           <div style={{ background:`url(${imageUrl}) center center / cover no-repeat`}}
                              className="recipe-image"
                            />
                              <div className= "recipe" >
                                <div className= "recipe-header" >
                                  <h2 className="recipe-name">  <strong>{name}</strong> </h2>
                                  <h5>  <strong>{category}</strong>  </h5>
                                    <p>
                                      {data.getRecipe.likes}{" "}
                                      <span role="img" aria-label="heart">  </span>
                                              ❤️    
                                    </p>
                                    <p>
                                    createdDate: <strong>{createdDate}</strong>
                                  </p>
                                <div/>
                              <div/>
                           </div>
                           <blockquote className="recipe-description">
                              {description}
                          </blockquote>
                          <h3 className="recipe-instructions__title">Instructions</h3>
                          <div className="recipe-instructions"
                            dangerouslySetInnerHTML={{__html: instructions}}
                          />
                          <LikeRecipe _id={_id}/>
                        </div>
                       </div>
                    )
                }}
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

              .like-button {
                position: fixed;
                right: 1em;
                bottom: 1em;
                font-size: 2rem;
                background-color: #f15f79;
                color: white !important;
              }

              .recipe-image {
                height: 60vh;
                width: 100%;
              }
              
              .recipe-image:after {
                content: "";
                position: absolute;
                width: 100%;
                height: 60vh;
                opacity: 0.25;
                transition: opacity 0.3s ease-in-out;
              }
              
              .recipe {
                text-align: center;
                background: whitesmoke;
                padding: 1em;
              }
              
              .recipe h1 {
                font-size: 2.5rem;
                text-align: center;
              }
              
              .recipe-header {
                overflow: hidden;
                background-image: url(https://bit.ly/2JqRbuI);
              }
              
              .recipe-header > p {
                margin: 0;
              }
              
              .recipe-description {
                font-size: 2rem;
                color: darkslategray;
                padding: 1em;
                font-weight: 200;
                background: white;
                box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
                font-style: italic;
              }
              
              .recipe-name {
                color: #1eaedb;
                text-decoration: underline;
                text-decoration-style: wavy;
              }
              
              .recipe-instructions {
                text-align: left;
                padding: 0 2em;
              }
              
              .recipe-instructions * {
                padding-bottom: 0.5em;
              }
              
              .recipe-instructions__title {
                font-weight: 200;
                letter-spacing: 2px;
                color: #1eaedb;
                text-decoration: underline;
              }
              
              .like-button {
                position: fixed;
                right: 1em;
                bottom: 1em;
                font-size: 2rem;
                background-color: #f15f79;
                color: white !important;
              }
              
        `}</style>
        </div>
    )
}


export default withRouter(RecipePage)