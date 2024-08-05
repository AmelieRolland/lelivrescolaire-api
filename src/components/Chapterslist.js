import { React, useEffect, useState, Image } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allChapters } from '../data/api';
import { useParams } from 'react-router';
import { Booklist } from './Booklist'
import Header from './Header';
import LessonsList from './LessonsList'
import './chaptersList.css'
import 'flowbite';
import Lessons from './LessonsList';




const Chapterslist = () => {


    const { bookId } = useParams();

    const [dataChapters, setDataChapters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [expandedChapterId, setExpandedChapterId] = useState(null);




    const fetchChapters = async () => {
        setIsLoading(true)
        try {
            const dataChapters = await allChapters(bookId);
            setDataChapters(dataChapters)
        } catch (e) {
            throw new Error("Erreur au chargement: ", e)
        }

    }
    // const chapterId = dataChapters.id


    useEffect(() => {

        fetchChapters();

        setIsLoading(false);

    }, [bookId])

    console.log(dataChapters);


    if (!dataChapters) {
        return <p>En attente des chapitres</p>
    }

    // const logItem = () => {
    // const body = document.getElementById('accordion-body');
    // body.toggleAttribute("hidden");
    // }

    // const header = document.getElementById('accordion-header');
    // header.addEventListener("toggle", logItem());

    const toggleChapter = (chapterId) => {
        setExpandedChapterId(expandedChapterId === chapterId ? null : chapterId);
    };







    return (
        <>
            <Header />

            <div className='container mx-12'>

                <h1 className='permanent-marker text-3xl py-16'>Tous les chapitres</h1>

                <div className=" w-2/5 flex flex-col">

                    {dataChapters.map(chapter => (
                        <>

                            <div key={chapter.id} id="accordion" >
                                <h2 id="accordion-header">
                                    <button type="button" class="flex items-center focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 justify-between p-5 w-full font-medium text-left border border-gray-200 dark:border-gray-700 border-b-0 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl" 
                                    onClick={() => toggleChapter(chapter.id)}
                                    aria-expanded={expandedChapterId === chapter.id}
                                    aria-controls={`accordion-body-${chapter.id}`}>
                                        <span class="flex items-center">{chapter.title}</span>

                                    </button>
                                </h2>
                                <div id={`accordion-body-${chapter.id}`}
                                    aria-labelledby={`accordion-header-${chapter.id}`}
                                    className={expandedChapterId === chapter.id ? 'block' : 'hidden'} >
                                    <div class=" border border-gray-200  border-b-0">
                                        {chapter.pages.map(lesson => (
                                            <button type='button' className='ps-5 py-2.5 bg-white w-full text-left'>{lesson.title}</button>
                                        ))}

                                    </div>
                                </div>

                            </div>
                        </>



                    ))}
                </div>

            </div>







        </>
    )
}
export default Chapterslist;