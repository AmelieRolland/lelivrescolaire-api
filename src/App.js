import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookList from './components/Booklist.js';
import Header from './components/Header.js';
import 'flowbite';


const queryClient = new QueryClient();

const App = () => {

  const [selectedSubject, setSelectedSubject] = useState();

  const handleSelectSubject = (subject) =>
    setSelectedSubject(subject);

  return (

    <QueryClientProvider
      client={queryClient}>

      <div className="App">

        <Header onSelectSubject={handleSelectSubject} />
        <BookList selectedSubject={selectedSubject} />

      </div>
    </QueryClientProvider>
  );
};

export default App;
