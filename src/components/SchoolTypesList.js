import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allSchoolTypes } from '../data/api';


const SchoolTypesList = ({onSelectSchoolType}) => {

    const { data: dataSchool, isLoading} = useQuery({
        queryKey: ['allSchoolTypes'],
        queryFn: allSchoolTypes

    });
    if (isLoading) {
        return <p>En attente de chargement</p>;
    } else if (dataSchool?.length === 0) {
        return <p>Oups! Aucun niveau disponible</p>
    }

    return (
        <>
            {dataSchool.map(school =>(
                <ul className='ps-4'>
                    <li>
                        <button type='button'
                        className='hover:bg-blue-200 hover:font-bold p-3 w-full rounded-lg text-left'
                        onMouseOver={() => onSelectSchoolType(school.name)}
                        >
                            {school.name}
                        </button>
                    </li>
                </ul>
            ))}

        </>
    )
}; export default SchoolTypesList;