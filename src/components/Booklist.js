import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allBooks } from '../data/api';
import LevelsList from './LevelsList';
import './Booklist.css';

const BookList = () => {

    const genericImageUrl ='/img/book.png';

    const [selectedLevel, setSelectedLevel] = useState();

    const { data: books, isLoading} = useQuery({
        queryKey: ['allBooks'],
        queryFn: allBooks,
    });

    const handleSelectLevel = (level) => {
        setSelectedLevel(level);
    };
    console.log(selectedLevel);

    const filteredBooks = selectedLevel ? books.filter((book) =>
        book.levels.find((level) => level.name === selectedLevel)
    ) : books;


    if (isLoading) {
        return (
            <p>En attente du chargement</p>
        );
    } else if (!books || books.length === 0 ){
        return (
            <p>Oups! Aucun livre disponible pour le moment</p>
        )
    }

    return (
        <>
            <div className='container mx-auto px-4'>
                <h1 className='permanent-marker text-3xl py-16'>Nos ouvrages {selectedLevel} :</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className={"group flex flex-row transition duration-700 ease-in-out max-w-full h-auto border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700" + (book.valid === true ? ' bg-white' : ' hidden')}>
                            <div className="flex-shrink-0 w-1/3">
                                <img src={book.urlLite ? book.urlLite : genericImageUrl} alt={book.displayTitle} className="w-full h-full object-contain rounded-l-lg transform transition-transform duration-700 ease-in-out group-hover:rotate-6" />
                            </div>
                            <div className='flex flex-col justify-between p-4 w-2/3'>
                                <div>
                                    <a href={`/book/${book.id}`}>
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{book.displayTitle}</h5>
                                    </a>
                                </div>
                                <div className='mt-2'>
                                    <a href={`/book/${book.id}`} title='découvrir le livre' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#ffa800] rounded-lg hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Ouvrir
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BookList;
