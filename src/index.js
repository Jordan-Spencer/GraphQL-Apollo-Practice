import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { App } from './components/app';
import { BrowserRouter as Router } from "react-router-dom";
import './index.styles.css';

export const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
});

const Root = () => (
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
