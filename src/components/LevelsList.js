import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { allLevels } from '../data/api';

const LevelsList = ({ onSelectLevel }) => {
    const { data: dataLevels } = useQuery({
        queryKey: ['allLevels'],
        queryFn: allLevels,
    });


    const college = [];
    dataLevels?.forEach((level) => {
        if (!!level.isMiddleSchool) {
            college.push(level);
        }
    });
    college.push({ levelName: 'Collège' })

    const primaire = [];
    dataLevels?.forEach((level) => {
        if (!!level.isElementarySchool) {
            primaire.push(level);
        }
    });
    primaire.push({ levelName: 'Primaire' });

    const lycee = [];
    dataLevels?.forEach((level) => {
        if (!!level.isHighSchool) {
            lycee.push(level);
        }
    });
    lycee.push({ levelName: 'Lycée' })

    const lyceePro = [];
    dataLevels?.forEach((level) => {
        if (!!level.isProHighSchool) {
            lyceePro.push(level);
        }
    })
    lyceePro.push({ levelName: 'Lycée Pro' })

    const filteredLevels = [];
    filteredLevels.push( primaire, college, lycee, lyceePro );

    console.log(filteredLevels)


    if (!dataLevels) {
        return <p>En attente de chargement</p>;
    }


    return (
        <div className="px-32 mx-auto flex bg-yellow-400 flex-row flex-wrap justify-between">

            {filteredLevels.map((levels) => (
                <div key={levels.id}>
                    {levels.primaire.map((level) => (

                                        <button
                                            type="button"
                                            className="hover:bg-white hover:text-yellow-500 text-white bg-yellow-400  font-medium text-sm px-5 py-4 text-center me-2 "
                                            onClick={() => onSelectLevel(level.levelName)}
                                        >
                                            {level.levelName}
                                        </button> 
                    ))}
                </div>

            ))}
        </div>
    );
};

export default LevelsList;
