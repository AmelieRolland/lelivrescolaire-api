import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookList from './components/Booklist.js';
import Header from './components/Header.js';
import 'flowbite';


const queryClient = new QueryClient();

const App = () => {
  return (

    <QueryClientProvider client={queryClient}>
    
      <div className="App">
        
          <Header />
        <BookList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
