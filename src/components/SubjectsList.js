import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allSubjects } from '../data/api';
import SchoolTypesList from './SchoolTypesList';

const SubjectsList = () => {

    const [selectedSchoolType, setSelectedSchoolType] = useState();

    const { data: subjects, isLoading } = useQuery({
        queryKey: ['allSubjects'],
        queryFn: allSubjects
    });

    const handleSelectSchoolType = (schoolType) =>
        setSelectedSchoolType(schoolType);

    console.log(selectedSchoolType);

    const selectSubjects = selectedSchoolType ? subjects.filter((subject) =>
        subject.schoolTypes.find((schoolType) => schoolType.includes(selectedSchoolType)
    )) : subjects;

    const filteredSubjects = selectSubjects.filter(subject => (subject.hasBooks === true))

    if (isLoading) {
        return (
            <p>En attente du chargement</p>
        );
    } else if (!subjects || subjects.length === 0) {
        return (
            <p>Oups! Aucune matière disponible pour le moment</p>
        )
    }

    return (
        <>

            <div className="flex">
                <div className="w-1/3 p-2">
                    <h3 className="text-lg ">Niveau</h3>
                    <SchoolTypesList onSelectSchoolType={handleSelectSchoolType} />
                </div>
                <div className="w-2/3 p-2">
                    <h3 className="text-lg ">Matière</h3>
                    {filteredSubjects.map((subject) =>
                        <p>{subject.name}</p>)}

                </div>

            </div>
        </>
    )
}; export default SubjectsList;