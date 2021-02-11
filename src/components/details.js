import React from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import './Details.styles.css';

const Details = ({
  match: {
    params: { id },
  },
}) => {
  const countryId = `${id}`;

  const COUNTRY_DETAILS_QUERY = gql`
    query($_id: String!) {
      Country(_id: $_id) {
        _id
        name
        capital
        flag {
          emoji
          emojiUnicode
          svgFile
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
        subregion {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(COUNTRY_DETAILS_QUERY, {
    variables: { _id: `${countryId}` },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <pre>
      {data.Country.map(
        ({ _id, name, capital, flag, currencies, officialLanguages, borders, subregion }) => (
          <div key={_id}>
            <h1>
              {name} <img src={flag.svgFile} alt="flag" />{' '}
              <Link to="/">
                <button>back</button>
              </Link>
            </h1>
            <table>
              <thead>
                <tr>
                  <th>CAPITAL</th>
                  <th>CURRENCY</th>
                  <th>LANGUAGES</th>
                  <th>BORDER COUNTRIES</th>
                  <th>REGION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{capital}</td>
                  <td>
                    {currencies.map(({ symbol }) =>
                      JSON.stringify(symbol).slice(1).replace(/"/g, ' ')
                    )}
                    {currencies.map(({ name }) => JSON.stringify(name).slice(1).replace(/"/g, ''))}
                  </td>
                  <td>
                    {officialLanguages
                      .map(({ name }) => name)
                      .reduce((prev, curr) => [prev, ', ', curr])}
                  </td>
                  <td>
                    {borders.map(({ name }) => name).reduce((prev, curr) => [prev, ', ', curr])}
                  </td>
                  <td>{subregion.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      )}
    </pre>
  );
};

export default Details;
