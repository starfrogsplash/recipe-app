import React ,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar'
import Search from './components/Recipes/Search'
import RecipePage from './components/Recipes/RecipePage'
import RecipeAdd from './components/Recipes/RecipeAdd'

import ApolloClient from  'apollo-boost'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from "react-router-dom";

import { ApolloProvider } from   'react-apollo'

const client = new ApolloClient({
    uri: "https://graphql-recipe-app.herokuapp.com/graphql",
  });

const Root = () => (
    <Router>
      <Fragment>
          <Navbar/>
          <Switch>
              <Route exact path='/' exact component={App}/>
              <Route path='/search' component={Search}/>
              <Route path='/recipes/add' component={RecipeAdd}/>
              <Route path='/recipes/:_id' component={RecipePage}/>
              <Redirect to='/'/>
          </Switch>
        </Fragment>
    </Router>
)

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root />
    </ApolloProvider>
, document.getElementById('root'));
