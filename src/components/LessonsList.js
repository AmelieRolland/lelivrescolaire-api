import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { allLessons } from '../data/api';
import Header from './Header';

const Lessons = () => {

    const { chapterId } = useParams();

    const [dataLessons, setDataLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    const fetchLessons = async () => {
        setIsLoading(true)
        try {
            console.log(chapterId);

            const dataLessons = await allLessons(chapterId)
            setDataLessons(dataLessons);
        } catch (e) {
            throw new Error("Erreur au chargement: ", e)
        }
    }

    useEffect(() => {

        fetchLessons();

        setIsLoading(false);

    }, [chapterId])



    // const lessonTitle = props.dataLessons.title;

    console.log(dataLessons)

    if (!dataLessons) {
        return <p>En attente des leçons</p>
    }




    return (
        <>
            {/* < Header />
            <div className='container w-4/5 mx-auto'> */}

                {/* <h1 className='permanent-marker text-3xl py-16'>Les leçons</h1> */}
                {dataLessons.map(lesson => (

                <div>
                    {lesson.title}
                </div>

            ))}


            {/* </div> */}

        </>
    )


}
export default Lessons;