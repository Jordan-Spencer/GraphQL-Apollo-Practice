import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import './app.styles.css';

const COUNTRY_DETAILS_QUERY = gql`
  query {
    Country {
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

export const Details = () => {
    const { loading, error, data } = useQuery(COUNTRY_DETAILS_QUERY);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {JSON.stringify(error)}</p>;
    }
  
    return (
      <pre>
      {data.Country.map(({name, capital, flag, currencies, officialLanguages, borders}) =>
        <h1>{name}</h1>
      )}
      </pre>
    );
  };