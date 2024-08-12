import { React, useEffect, useState, Image } from 'react';
import { allChapters } from '../data/api';
import { useParams } from 'react-router';
import Header from './Header';
import parse, { attributesToProps } from 'html-react-parser';
import './chaptersList.css'


const Chapterslist = () => {
    const { bookId } = useParams();

    const [dataChapters, setDataChapters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [expandedChapterId, setExpandedChapterId] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState();
    const [selectedSubject, setSelectedSubject] = useState();


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

    const toggleChapter = (chapterId) => {
        setExpandedChapterId(expandedChapterId === chapterId ? null : chapterId);
    };


    const groupChaptersByTheme = (chapters) => {
        const groupedChapters = {};
        chapters.forEach((chapter) => {
            const theme = chapter.theme || [];
            if (!groupedChapters[theme]) {
                groupedChapters[theme] = [];
            }
            groupedChapters[theme].push(chapter);
        });
        return groupedChapters;
    };

    const chaptersByTheme = groupChaptersByTheme(dataChapters);

    const handleSelectedLesson = (lesson) => {
        setSelectedLesson(lesson);
    };

    const options = {
        replace(domNode) {
            if (domNode.attribs && domNode.name === 'picture') {
                const caption = domNode?.firstChild?.next?.children[1]?.children[1]?.children[0]?.data;
                const width = domNode?.lastChild?.attribs ?? 'width=100%';
                const props = attributesToProps(domNode.attribs);
                return <><img {...props}{...width} /><figcaption>{caption ?? `Crédits: ${caption}`}</figcaption></>
            }
            if (domNode.attribs && domNode.name === 'tip') {
                const props = attributesToProps(domNode.attribs);
                return <></>
            }
            if (domNode.attribs && domNode.name === 'stamp') {
                console.log(domNode.attribs.icon)
                if (domNode.attribs.icon === 'hand') {
                    return <stamp>👋</stamp>
                }
            }
        }
    }

    console.dir(dataChapters);

    if (isLoading) {
        return <p>En attente des manuels</p>
    } else if (dataChapters?.length === 0) {
        return <p>Oups! Aucuns chapitres disponibles pour le moment</p>
    }

    return (
        <>
            <Header setSelectedSubject={setSelectedSubject} />

            <div className='mx-12'>

                <div className='flex flex-row flex-wrap'>

                    <div className=" w-2/6 pr-6">
                        <div className='side'>
                            <a href="/"> Retour aux livres </a>
                            <h1 className='permanent-marker text-3xl pb-16'>Tous les chapitres</h1>

                            {Object?.keys(chaptersByTheme).map((theme) => (
                                <div key={theme}>

                                    <button className="flex items-center  justify-between p-5 w-full font-medium text-left border border-gray-200  border-b-0 text-gray-900 dark:text-white bg-white d hover:bg-blue-300 focus:bg-blue-100 rounded-t-xl">
                                        <h2 className='uppercase text-blue-300'>{theme ?? `Thème ${theme}`}</h2>
                                    </button>
                                    {chaptersByTheme[theme].sort((a, b) => a.number - b.number).map(chapter => (

                                        <div key={chapter.id} id="accordion" className='overflow-scroll'>
                                            <h2 id="accordion-header">
                                                <button type="button" className="flex items-center  justify-between p-5 w-full font-medium text-left border border-gray-200  border-b-0 text-gray-900 dark:text-white bg-white d hover:bg-blue-300 focus:bg-blue-100 rounded-t-xl"
                                                    onClick={() => toggleChapter(chapter.id)}
                                                    aria-expanded={expandedChapterId === chapter.id}
                                                    aria-controls={`accordion-body-${chapter.id}`}>
                                                    <span class="flex items-center"><strong>{chapter.title}</strong></span>
                                                    <span className='text-xs ps-4'><i> Ch.{chapter.number}</i></span>

                                                </button>
                                            </h2>
                                            <div id={`accordion-body-${chapter.id}`}
                                                aria-labelledby={`accordion-header-${chapter.id}`}
                                                className={`transition-max-height duration-500 ease-in-out overflow-scroll ${expandedChapterId === chapter.id ? 'max-h-screen' : 'max-h-0'}`}>

                                                <div class="bg-blue-100 border border-gray-200  border-b-0">
                                                    {chapter.pages.sort((a, b) => a.page - b.page).map(lesson => (
                                                        <button
                                                            onClick={() => handleSelectedLesson(lesson)}
                                                            type='button' className='flex items-center  justify-between p-5 py-2.5 hover:bg-blue-300 focus:bg-blue-300 bg-blue-100 w-full text-left'>
                                                                <span class="pe-6 flex items-center">{lesson.title}</span>
                                                                <span className='text-xs ps-6'>p.{lesson.page} - {lesson.nbPages + lesson.page}</span>
                                                        
                                                        </button>
                                                    ))}

                                                </div>

                                            </div>

                                        </div>
                                    ))}
                                </div>

                            ))}
                        </div>

                    </div>

                    <div className='page w-4/6 p-6 bg-white relative overflow-visible mt-24'>
                        {
                            selectedLesson ? (
                                <div className='overflow-scroll relative'>
                                    <div className='pageHeader p-6 mb-6'>
                                        {parse(selectedLesson.content)}
                                    </div>
                                    <div>
                                        {selectedLesson.children.sort((a, b) => a.id - b.id).map(doc => (
                                            <div key={selectedLesson.id}>
                                                {parse(doc.content, options)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : <div className='flex flex-col justify-center'>
                                <h2 className='pt-16'>Sélectionne une <span className='strong z-10'>leçon!</span></h2>
                                <img src='/img/book.png' className='w-2/3 mx-auto pt-16'></img>
                            </div>
                        }
                    </div>

                </div>

            </div>
        </>
    )
}
export default Chapterslist;