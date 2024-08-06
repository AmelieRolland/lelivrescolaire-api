import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allSubjects } from '../data/api';

const SubjectsList = () => {

    const [selectedSchoolType, setSelectedSchoolType] = useState();

    const {data: subjects, isLoading} = useQuery ({
        queryKey: ['allSubjects'],
        queryFn: allSubjects
    });

    // const handleSelectSchoolType = (schoolType) => 
    //     setSelectedSchoolType(schoolType);

    // console.log(selectedSchoolType);

    // const filteredSubjects = selectedSchoolType ? subjects.filter((subject) =>
        // subject.schoolTypes.find((schoolType) => schoolType.name === selectedSchoolType)) : subjects;



    if (isLoading) {
        return (
            <p>En attente du chargement</p>
        );
    } else if (!subjects || subjects.length === 0 ){
        return (
            <p>Oups! Aucune matière disponible pour le moment</p>
        )
    }

    return (
        <>
            <div>
                {subjects.map((subject) =>
                <p>{subject.name}</p>)}

            </div>
        </>
    )
}; export default SubjectsList;