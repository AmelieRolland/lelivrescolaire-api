import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LessonsList from './LessonsList'
import Header from './Header';

const queryClient = new QueryClient();

const Lessons = () => {
    return (
        <QueryClientProvider client={queryClient}>

            <LessonsList />
        </QueryClientProvider>
    )
}

export default Lessons;