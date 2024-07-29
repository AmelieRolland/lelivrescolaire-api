import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { allBooks } from '../data/api';

const BookList = () => {
    const { data } = useQuery({
        queryKey: 'allBooks',
        queryFn: allBooks,
    });
    if (!data) {
        return <p>No data available</p>;
    }

    console.log(data);

    return (
        <div>
            <h1>Nos ouvrages</h1>

            {data.map(book => (
                <h2 key={book.id}>{book.displayTitle}</h2>
            ))}

        </div>
    );
};

export default BookList;
