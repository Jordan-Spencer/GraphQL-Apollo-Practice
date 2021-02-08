import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Details from './Details';
import './Home.styles.css';

const ALL_COUNTRIES_QUERY = gql`
  query {
    Country {
      _id
      name
      capital
      officialLanguages {
        name
      }
    }
  }
`;

const Home = () => {
    const { loading, error, data } = useQuery(ALL_COUNTRIES_QUERY);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {JSON.stringify(error)}</p>;
    }
  
    return (
      <pre>
      <h1>Countries</h1>
        <table>
            <thead>
            <tr><th>NAME</th><th>CAPITAL</th><th>LANGUAGES</th></tr>
            </thead>
            <tbody>
            {data.Country.map(({ _id, name, capital, officialLanguages}) => 
            <tr className='country' key={_id}>
                <td key={name}><Link to={`/details/${_id}`}>{name}</Link></td>
                <td key={`capital ${capital}`}>{capital}</td>
                <td key={officialLanguages}>{officialLanguages.map(({name}) =>
                    JSON.stringify(name).slice(1).replace(/"/g, ", ")
                )}
                </td>
            </tr>
            )}
            </tbody>
        </table>
      </pre>
    );
  };

  export default Home;