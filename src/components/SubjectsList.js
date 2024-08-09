import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { allSubjects } from '../data/api';
import SchoolTypesList from './SchoolTypesList';
import { redirect, useNavigate } from 'react-router';

const SubjectsList = ({setSelectedSubject, setSelectedSchoolType, selectedSchoolType}) => {

    const navigate = useNavigate();


    const { data: subjects, isLoading } = useQuery({
        queryKey: ['allSubjects'],
        queryFn: allSubjects
    });

    console.log(setSelectedSchoolType);
    const filteredSubjects = selectedSchoolType ? subjects?.filter(
        (subject) =>
        (subject.schoolTypes.find((schoolType) => schoolType.includes(selectedSchoolType) && (subject.hasBooks === true)) 
        )) : subjects;

    

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
                    <SchoolTypesList setSelectSchoolType={setSelectedSchoolType} />
                </div>
                <div className="w-2/3 p-10">
                    <h3 className="text-lg pb-6">Matière</h3>
                    {filteredSubjects.map((subject) =>
                        <button className='p-4 hover:bg-blue-200 hover:font-bold w-full rounded-lg text-left'
                            onClick={() => { setSelectedSubject(subject.name); navigate(`/${subject.name}`)
                        }}
                            
                        >{subject.name}</button>)}

                </div>

            </div>
        </>
    )
}; export default SubjectsList;