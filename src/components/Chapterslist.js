import { React, useEffect, useState, Image } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allChapters } from '../data/api';
import { useParams } from 'react-router';
import { Booklist } from './Booklist'
import Header from './Header';


const Chapterslist = () => {
    const { bookId } = useParams();

    const [dataChapters, setDataChapters] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchChapters = async () => {
        setIsLoading(true)
        try {
            const dataChapters = await allChapters(bookId);
            setDataChapters(dataChapters)
        } catch (e) {
            throw new Error("Erreur au chargement: ", e)
        }

    }

    useEffect(() => {

        fetchChapters();

        setIsLoading(false);

    }, [bookId])
    console.log(dataChapters);


    if (!dataChapters) {
        return <p>En attente des chapitres</p>
    }


    
    return (
        <>
            <Header />

            <div className='container w-4/5 mx-auto'>

            <h1 className='permanent-marker text-3xl py-16'>Tous les chapitres</h1>

            <div className=" w-full mx-auto flex flex-row flex-wrap">

                {dataChapters.map(chapter => (

                    <div className={"max-w-sm w-80 m-6 h-40 flex flex-row border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" + (chapter.valid === true ? 'bg-white' : ' hidden')}>
                        <div>
                            {/* <Image
                                src={chapter.url}
                                width={50}
                                height={70}
                            /> */}
                        </div>



                        <div className="p-5">
                            <a href={`/book/${chapter.id}`}>

                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{chapter.title}</h5>
                            </a>
                            <a href={`/book/${chapter.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Ouvrir
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>



                ))}
            </div>
            </div>


        </>
    )
}
export default Chapterslist;