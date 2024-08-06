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

    const filteredSubjects = selectedSchoolType ? subjects.filter(
        (subject) =>
        (subject.schoolTypes.find((schoolType) => schoolType.includes(selectedSchoolType)) && (subject.hasBooks === true)
    )) : subjects;

    // const filteredSubjects = selectSubjects.filter(selectSubject => selectSubject.hasBooks === true);

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
                <div className="w-1/3 p-10 border-r">
                    <h3 className="text-lg pb-6 ">Niveau</h3>
                    <SchoolTypesList onSelectSchoolType={handleSelectSchoolType} />
                </div>
                <div className="w-2/3 p-10">
                    <h3 className="text-lg pb-6">Matière</h3>
                    {filteredSubjects.map((subject) =>
                        <p className='p-4'>{subject.name}</p>)}

                </div>

            </div>
        </>
    )
}; export default SubjectsList;