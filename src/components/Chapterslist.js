import { React, useEffect, useState, Image } from 'react';
import { allChapters } from '../data/api';
import { useParams } from 'react-router';
import Header from './Header';
import './chaptersList.css'
import 'flowbite';


const Chapterslist = () => {
    const { bookId } = useParams();

    const [dataChapters, setDataChapters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [expandedChapterId, setExpandedChapterId] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState();

    const fetchChapters = async () => {
        setIsLoading(true)
        try {
            const dataChapters = await allChapters(bookId);
            setDataChapters(dataChapters)
            setIsLoading(false)

        } catch (e) {
            throw new Error("Erreur au chargement: ", e)
        }

    }

    useEffect(() => {
        fetchChapters();

    }, [bookId])

    console.log(dataChapters);

    const toggleChapter = (chapterId) => {
        setExpandedChapterId(expandedChapterId === chapterId ? null : chapterId);
    };

    const handleSelectedLesson = (lesson) => {
        setSelectedLesson(lesson);
    };

    if (isLoading) {
        return <p>En attente des manuels</p>
    } else if (dataChapters?.length === 0) {
        return <p>Oups! Aucuns chapitres disponibles pour le moment</p>
    }

    return (
        <>
            <Header />

            <div className='container mx-12'>

                <h1 className='permanent-marker text-3xl py-16'>Tous les chapitres</h1>

                <div className='flex flex-row'>

                    <div className=" w-2/5 pr-6">

                        {dataChapters.map(chapter => (

                            <div key={chapter.id} id="accordion" >
                                <h2 id="accordion-header">
                                    <button type="button" class="flex items-center  justify-between p-5 w-full font-medium text-left border border-gray-200  border-b-0 text-gray-900 dark:text-white bg-white d hover:bg-blue-300 focus:bg-blue-100 rounded-t-xl"
                                        onClick={() => toggleChapter(chapter.id)}
                                        aria-expanded={expandedChapterId === chapter.id}
                                        aria-controls={`accordion-body-${chapter.id}`}>
                                        <span class="flex items-center"><strong>{chapter.title}</strong></span>

                                    </button>
                                </h2>
                                <div id={`accordion-body-${chapter.id}`}
                                    aria-labelledby={`accordion-header-${chapter.id}`}
                                    className={`transition-max-height duration-500 ease-in-out overflow-hidden ${expandedChapterId === chapter.id ? 'max-h-screen' : 'max-h-0'}`}>

                                    <div class="bg-blue-100 border border-gray-200  border-b-0">
                                        {chapter.pages.map(lesson => (
                                            <button
                                                onClick={() => handleSelectedLesson(lesson)}
                                                type='button' className='ps-5 py-2.5 bg-blue-100 w-full text-left'>{lesson.title}</button>
                                        ))}

                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>

                    <div className='w-3/5 p-6'>
                        {
                            selectedLesson ? (
                                <div>
                                    <h2>{selectedLesson.title}</h2>
                                </div>
                            ) : <h2>Sélectionne une leçon!</h2>
                        }
                    </div>

                </div>

            </div>
        </>
    )
}
export default Chapterslist;