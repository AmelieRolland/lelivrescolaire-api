import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Chapterslist from './Chapterslist';

const queryClient = new QueryClient();

const Chapters = () =>{
    return(
        <QueryClientProvider client={queryClient}>
            <Chapterslist />
        </QueryClientProvider>
    )
}

export default Chapters;