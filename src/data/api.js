import { request, gql } from 'graphql-request';

const endpoint = 'https://api.lelivrescolaire.fr/graph';

const ALL_BOOKS = gql`
  query allBooksQuery {
    viewer {
      books {
        hits {
          id
          displayTitle
          url
          subjects {
            name
          }
          levels {
            name
          }
          valid
        }
      }
    }
  }
`;

export const allBooks = async () => {
    try {
        const data = await request(endpoint, ALL_BOOKS);
        return data.viewer.books.hits;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des données")
    }
};
