import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allBooks } from '../data/api';

const genericImageUrl = '/img/book.png';

const BookList = ({ selectedSubject, selectedSchoolType }) => {

    const { data: books, isLoading, refetch } = useQuery({
        queryKey: ['allBooks'],
        queryFn: allBooks,
    });

    console.log('to');

    useEffect(() => {
        refetch();
    }, [selectedSubject, selectedSchoolType])

    console.log(selectedSubject);
    console.log(selectedSchoolType);


    const filteredBooks = selectedSubject ? books?.filter((book) =>
        book.subjects.find((subject) => (subject.name === selectedSubject) && (subject.schoolTypes.includes(selectedSchoolType))
        )) : books;

    console.log(filteredBooks);

    const highSchoolBooks = filteredBooks?.filter(book =>
        book.levels.find(level => level.isHighSchool)
    );

    const middleSchoolBooks = filteredBooks?.filter(book =>
        book.levels.find(level => level.isMiddleSchool)
    );

    const elementarySchoolBooks = filteredBooks?.filter(book =>
        book.levels.find(level => level.isElementarySchool)
    );

    const proHighSchoolBooks = filteredBooks?.filter(book =>
        book.levels.find(level => level.isProHighSchool)
    );


    if (isLoading) {
        return (
            <p>En attente du chargement</p>
        );
    } else if (books?.length === 0) {
        return (
            <p>Oups! Aucun livre disponible pour le moment</p>
        )
    }

    return (
        <>
            <div className='container mx-auto px-4'>
                <h1 className='permanent-marker text-black text-3xl pt-32 pb-16'>Nos ouvrages {selectedSubject ? <span className='strong'>{selectedSubject}</span> : ''}:</h1>

                {highSchoolBooks && highSchoolBooks.length > 0 && (
                    <>

                <h2 className='text-3xl py-16 font-bold text-[#21bfef] '>Lycée  :</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {highSchoolBooks.map((book) => (
                        <div key={book.id} className={"group flex flex-row transition duration-700 ease-in-out max-w-full h-auto border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700" + (book.valid === true ? ' bg-white' : ' hidden')}>
                            <div className="flex-shrink-0 w-1/3">
                                <img src={book.urlLite ?? genericImageUrl} alt={book.displayTitle} className="w-full h-full object-contain rounded-l-lg transform transition-transform duration-700 ease-in-out group-hover:rotate-6" />
                            </div>
                            <div className='flex flex-col justify-between p-4 w-2/3'>
                                <div>
                                    <a href={`/book/${book.id}`}>
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{book.displayTitle}</h5>
                                    </a>
                                </div>
                                <div className='mt-2'>
                                    <a href={`/book/${book.id}`} title='découvrir le livre' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#ffa800] rounded-lg hover:bg-[#e69a01] focus:outline-none">
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
                </>
                )}

                {middleSchoolBooks && middleSchoolBooks.length > 0 && (
                    <>

                        <h2 className='text-3xl py-16 font-bold text-[#21bfef]'>Collège :</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {middleSchoolBooks.map((book) => (
                                <div key={book.id} className={"group flex flex-row transition duration-700 ease-in-out max-w-full h-auto border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700" + (book.valid === true ? ' bg-white' : ' hidden')}>
                                    <div className="flex-shrink-0 w-1/3">
                                        <img src={book.urlLite ?? genericImageUrl} alt={book.displayTitle} className="w-full h-full object-contain rounded-l-lg transform transition-transform duration-700 ease-in-out group-hover:rotate-6" />
                                    </div>
                                    <div className='flex flex-col justify-between p-4 w-2/3'>
                                        <div>
                                            <a href={`/book/${book.id}`}>
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{book.displayTitle}</h5>
                                            </a>
                                        </div>
                                        <div className='mt-2'>
                                            <a href={`/book/${book.id}`} title='découvrir le livre' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#ffa800] rounded-lg hover:bg-[#e69a01] focus:outline-none">
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
                    </>
                )
            }
            </div>
        </>
    );
};

export default BookList;
