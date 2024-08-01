import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allBooks } from '../data/api';
import LevelsList from './LevelsList';
import './Booklist.css';

const BookList = () => {
    const [selectedLevel, setSelectedLevel] = useState();

    const { data: books } = useQuery({
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



    if (!books) {
        return (
            <p>En attente du chargement</p>
        );
    }

    return (
        <>
            <LevelsList onSelectLevel={handleSelectLevel} />

            <div className='container w-4/5 mx-auto'>
                <h1 className='permanent-marker text-3xl py-16'>Nos ouvrages {selectedLevel} :</h1>
                <div className="w-full mx-auto flex flex-row flex-wrap justify-between">

                    {filteredBooks.map((book) => (
                        <div key={book.id} className={" max-w-sm w-80 m-4 h-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" + (book.valid === true ? ' bg-white' : ' hidden')}>

                            <div className="p-5 w-full flex flex-row h-full">
                                <div>
                                    <img src={book.urlLite} alt={book.displayTitle} />
                                </div>
                                <div className='flex w-full flex-col justify-between h-full'>
                                    <div>
                                        <a href={`/book/${book.id}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.displayTitle}</h5>
                                        </a>
                                    </div>
                                    <div className='place-self-end'>
                                        <a href={`/book/${book.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#ffa800] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Ouvrir
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                    </div>
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
