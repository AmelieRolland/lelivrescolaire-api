import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookList from './components/Booklist.js';
import Header from './components/Header.js';
import 'flowbite';
import { onSelectSubject } from './utils/onSelectSubject.js';
import { useParams } from 'react-router';


const queryClient = new QueryClient();

const App = () => {

  const { subjectId } = useParams();
  const [selectedSubject, setSelectedSubject] = useState(subjectId);
  const [selectedSchoolType, setSelectedSchoolType] = useState();

  


  console.log(selectedSubject);

  return (

    <QueryClientProvider
      client={queryClient}>

      <div className="App">

        <Header setSelectedSubject={setSelectedSubject} setSelectedSchoolType={setSelectedSchoolType} selectedSchoolType={selectedSchoolType} />
        <BookList selectedSubject={selectedSubject} selectedSchoolType={selectedSchoolType}/>

      </div>
    </QueryClientProvider>
  );
};

export default App;
