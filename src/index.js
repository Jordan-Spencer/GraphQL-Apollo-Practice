import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Home from './components/Home';
import Details from './components/Details';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.styles.css';

export const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
});

const Root = () => (
  <Router>
    <ApolloProvider client={client}>
      <Route exact path="/" component={Home} />
      <Route path="/details/:id" component={Details} />
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
