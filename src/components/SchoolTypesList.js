import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allSchoolTypes } from '../data/api';

const SchoolTypesList = () => {

    const [isLoading, setIsLoading] = useState(true);

    const { data: dataSchool } = useQuery({
        queryKey: ['allSchoolTypes'],
        queryFn: allSchoolTypes

    });
    


    console.log(dataSchool)

    // if (isLoading) {
    //     return <p>En attente de chargement</p>;
    // } 
    // else 
    if (!dataSchool || dataSchool.length === 0) {
        return <p>Oups! Aucun niveau disponible</p>
    }

    return (
        <>
            {dataSchool.map(school =>(
                <ul>
                    <li>
                        <button type='button'>
                            {school.name}
                        </button>
                    </li>
                </ul>
            ))}

        </>
    )
}; export default SchoolTypesList;