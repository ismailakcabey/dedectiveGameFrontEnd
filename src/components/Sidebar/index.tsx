import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CloseOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import DashBoard from '../../pages/dashboard';
import { Link } from 'react-router-dom';


const Sidebar = (
    {
        menuElement
    }:any
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // İlk başta pencere boyutunu kontrol etmek için çağırın

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <div className="flex bg-gradient-to-r from-grey-900 to-grey-800 text-white">
      {isMobileView ? (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 top-0 left-0 flex items-center justify-center w-12 h-12 bg-white-800 focus:outline-none"
        >
          {isOpen ? (
            <></>
          ) : (
            <svg className="w-6 h-6 text-grey-800 dark:text-grey mt-5 ml-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 14">
    <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z"/>
</svg>
          )}
        </button>
      ) : null}

      <Transition
        show={isOpen || !isMobileView}
        enter="transition-transform duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className={`flex-shrink-0 w-64 ${
          isMobileView ? 'fixed inset-y-0 left-0' : ''
        }`}
      >
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between p-4">
          <div className="flex flex-col items-center pb-10">
          <div className="flex items-center">
  <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://cdn-icons-png.flaticon.com/128/3067/3067684.png" alt="Bonnie image" />
  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Dedective Game</h5>
</div>

    </div>
            {!isMobileView ? null : (
              <button
                onClick={toggleSidebar}
                className="text-white focus:outline-none"
              >
                <CloseOutlined className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            {
                menuElement.map((menuItem:any,key:number)=>{
                    return(
                        <Link key={key} to={menuItem.link}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <span className="flex-1 ml-3 whitespace-nowrap">{menuItem.name}</span>
            </a>
                        </Link>
                    )
                })
            }
          </div>
        </div>
      </Transition>
    </div>
    </div>
  );
};

export default Sidebar;
