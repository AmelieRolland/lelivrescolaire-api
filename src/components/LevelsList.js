import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { allLevels } from '../data/api';

const LevelsList = ({ onSelectLevel }) => {
    const { data: dataLevels} = useQuery({
        queryKey: ['allLevels'],
        queryFn: allLevels,
    });

    if (!dataLevels) {
        return <p>En attente de chargement</p>;
    }

    console.log(dataLevels);
    const filteredLevels = dataLevels.filter(level => (!level.isElementarySchool && !level.isPreSchool));





    return (
        <div className="px-32 mx-auto flex bg-yellow-400 flex-row flex-wrap justify-between">
            
            {filteredLevels.map((level) => (
                <button
                    type="button"
                    className="hover:bg-white hover:text-yellow-500 text-white bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium text-sm px-5 py-4 text-center me-2 "
                    onClick={() => onSelectLevel(level.name)}
                >
                    {level.name}
                </button>
            ))}
        </div>
    );
};

export default LevelsList;
