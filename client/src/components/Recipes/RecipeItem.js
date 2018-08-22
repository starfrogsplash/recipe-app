import React from 'react';
import {Link} from 'react-router-dom'
import posed from 'react-pose';

const RecipeItem = posed.li({
  shown: {opacity:1 },
  hidden: {opacity: 0 }
})

export default ({ _id,imageUrl, name, category, likes}) => (
    <div>
        <RecipeItem 
          style={{ background:`url(${imageUrl}) center center / cover no-repeat`}}
          className="card"
        > 
        <span className={category}>   {category} </span>
            <div className="card-text">
              <Link to={`/recipes/${_id}`}> <h4> {name} </h4> </Link>
               <p style={{marginBottom:0}}> likes: {likes} </p>
               
            </div>
      </RecipeItem>
   <style jsx>{`
       .card {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-shadow: -3px 3px 10px 0px rgba(168, 168, 168, 0.4);
        text-align: center;
        background: #ddd;
        transition: all 0.3s;
        height: 240px;
      }
      
      .card:hover {
        transform: scale(1.05);
      }
      
      .card:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.25;
        transition: opacity 0.3s ease-in-out;
      }
      
      .card:hover:after {
        opacity: 0;
      }
      
      .card-text {
        position: relative;
        z-index: 1;
        color: rgb(39, 37, 37);
        background: whitesmoke;
        letter-spacing: 1px;
      }

      .card-text a {
        text-decoration: none;
      }
      
      .card-text h4 {
        margin: 0;
        padding: 0.2em;
      }

      .Lunch {
        width: 20%;
        margin: 20px;
        z-index: 1;
        padding: 7px;
        border-radius: 5px;
        color: white;
        background: #24c6dc;
        background: linear-gradient(to right, #514a9d, #24c6dc);
      }
      
      .Snack {
        width: 20%;
        margin: 20px;
        z-index: 1;
        padding: 7px;
        border-radius: 5px;
        color: white;
        background: #50c9c3;
        background: linear-gradient(to right, rgb(80, 146, 143), rgb(2, 105, 100));
      }
      
      .Breakfast {
        width: 100px;
        margin: 20px;
        z-index: 1;
        color: white;
        padding: 7px;
        background: #9d50bb;
        border-radius: 50px 120px 120px;
      }
      
      .Dinner {
        width: 20%;
        margin: 20px;
        z-index: 1;
        padding: 7px;
        color: white;
        background: linear-gradient(to right, #b24592, #f15f79);
        border-radius: 50px 120px 120px;
      }    

    `}</style>
   </div>

)
