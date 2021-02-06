import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import './Details.styles.css'
import emojiFlags from 'emoji-flags';

const Details = ({ match: {params: {id}}}) => {

  const countryId = `${id}`;
  console.log({countryId});

  const COUNTRY_DETAILS_QUERY = gql`
  query ($_id: String!) {
    Country(_id: $_id) {
        _id
        name
        capital
        flag {
            emoji
        }
        currencies {
            symbol
            name
        }
        officialLanguages {
            name
        }
        borders {
            name
        }
    }
  }
`;

    const { loading, error, data } = useQuery(COUNTRY_DETAILS_QUERY, {
      variables: { _id: `${countryId}`}
    });
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {JSON.stringify(error)}</p>;
    }

    // {emojiFlags.countryCode()}
  
    return (
      <pre>
      {data.Country.map(({_id, name, capital, flag, currencies, officialLanguages, borders}) =>
          <div>
            <h1>{name} {flag.emoji} <Link to='/'><button>back</button></Link></h1>
          <table>
          <thead>
            <tr><th>CAPITAL</th><th>CURRENCY</th><th>LANGUAGES</th><th>BORDER COUNTRIES</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{capital}</td>
              <td>{currencies.map(({symbol}) =>
              JSON.stringify(symbol).slice(1).replace(/"/g, " "))}
              {currencies.map(({name}) =>
              JSON.stringify(name).slice(1).replace(/"/g, ''))}
              </td>
              <td>{officialLanguages.map(({name}) =>
                JSON.stringify(name).slice(1).replace(/"/g, ", "))}</td>
              <td>{borders.map(({name}) =>
              JSON.stringify(name).slice(1).replace(/"/g, ", "))}</td>
            </tr>
          </tbody>
          </table>
        </div>
      )}
      </pre>
    );
  };

export default Details;