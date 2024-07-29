import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookList from './components/Booklist.js';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Le Livre Scolaire</h1>
        <BookList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
