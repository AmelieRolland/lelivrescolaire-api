import { request, gql } from 'graphql-request';

const endpoint = 'https://api.lelivrescolaire.fr/graph';

const ALL_BOOKS = gql`
  query allBooksQuery {
    viewer {
      books(isValid:true) {
        hits {
          id
          displayTitle
          url
          urlLite
          subjects {
            name
            schoolTypes
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

const CHAPTERS = gql`
    query chapters($bookId:Int){
        viewer {
            chapters(bookIds:[$bookId]){
                hits{
                id 
                title 
                urlLite 
                valid
                number
                pages{
                title
                content
                children{content
                picture
                metadata}
                }
                }
            }
        }
    }`;


const SCHOOLTYPES = gql`
    query {
      viewer {
        schoolTypes {
          hits {
            id
            name
          }
        }
      }
    }
  `;

const LEVELS = gql`
    query {
      viewer {
        levels{
          name
          isElementarySchool
          isPreSchool
        }
      }
    }
  `;

const LESSONS = gql`
    query ($chapterId:Int){
      viewer{
        pages (chapterIds:[$chapterId]) {
          hits{
            id
            title
            contentMd
            chapter{id}
            }
        }
      }
    }
  `;
  
  const SUBJECTS = gql`
  query {
  viewer{
    subjects{
      hits{ 
        name
        hasBooks
        schoolTypes}
    }
  }
}`;



export const allBooks = async () => {
  try {
    const data = await request(endpoint, ALL_BOOKS);
    console.log(data);
    return data?.viewer?.books?.hits ?? [];
  } catch (e) {
    throw new Error(`Erreur lors du chargement des livres ${e}`);
  }
};

export const allChapters = async (id) => {
  try {
    const idInt = parseInt(id);
    const dataChapters = await request(endpoint, CHAPTERS, {
      bookId: idInt
    });
    return dataChapters?.viewer?.chapters?.hits ?? [];
  } catch (e) {
    throw new Error(`Erreur lors du chargement des chapitres ${e}`);
  }
};

export const allLessons = async (id) => {
  try {
    const idInt = parseInt(id);
    const dataLessons = await request(endpoint, LESSONS, {
      chapterId: idInt
    });
    return dataLessons?.viewer?.pages?.hits ?? [];
  } catch(e) {
    throw new Error(`Erreur lors du chargement des leçons ${e}`);
  }
};

export const allLevels = async () => {
  try {
    const dataLevels = await request(endpoint, LEVELS);
    return dataLevels?.viewer?.levels ?? [];
  } catch (e) {
    throw new Error(`Erreur lors du chargement des niveaux ${e}`);
  }
};

export const allSchoolTypes = async () => {
  try {
    const dataSchool = await request(endpoint, SCHOOLTYPES);
    return dataSchool?.viewer?.schoolTypes?.hits ?? [];
  } catch (e) {
    throw new Error(`Erreur lors du chargement des écoles ${e}`);
  }
}

export const allSubjects = async () => {
  try {
    const dataSubjects = await request(endpoint, SUBJECTS);
    return dataSubjects?.viewer?.subjects?.hits ?? [];
  } catch (e) {
    throw new Error(`Erreur lors du chargement des sujets ${e}`);
  }
}
