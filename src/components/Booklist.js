import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { allBooks } from '../data/api';


const BookList = () => {
    const { data } = useQuery({
        queryKey: ['allBooks'],
        queryFn: allBooks,
    });
    if (!data) {
        return <p>En attente des livres</p>;
    }

    console.log(data);

        

    return (
        <div className=' container mx-auto'>
            <h1>Tous nos ouvrages</h1>

            <div className=" w-full mx-auto flex flex-row flex-wrap">


                {data.map(book => (
                    <>


                        <div className={"max-w-sm w-80 m-6 h-40  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" + (book.valid === true ? 'bg-white' : ' hidden')}>
                            <div className="p-5">
                                <a href={`/book/${book.id}`}>

                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.displayTitle}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.levels.name}</p>
                                <a href={`/book/${book.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Ouvrir
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>



                    </>
                ))

                }



            </div>
        </div>
    );

};

export default BookList;
