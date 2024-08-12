import React, { useState } from 'react';
import SchoolTypesList from './SchoolTypesList';
import SubjectsList from './SubjectsList';

const Header = ({ setSelectedSubject, setSelectedSchoolType, selectedSchoolType }) => {

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (

    <div className='fixed w-full z-10'>

      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/img/logoname.png" class="h-8" alt="Flowbite Logo" />
          </a>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button onClick={handleSubMenuToggle} className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-black-700 md:p-0" aria-current="page"><strong>Nos manuels 👇</strong></button>

                <div className={`z-10 transition-max-height duration-500 ease-in-out nav-blue w-full p-4 absolute top-16 left-0 right-0 mx-auto border border-gray-100 rounded-lg shadow-lg ${isSubMenuOpen ? 'block' : 'hidden'}`}>

                  <SubjectsList setSelectedSubject={setSelectedSubject} setSelectedSchoolType={setSelectedSchoolType} selectedSchoolType={selectedSchoolType} setIsSubMenuOpen={setIsSubMenuOpen} />

                </div>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>

  )
}

export default Header;