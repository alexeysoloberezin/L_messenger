'use client';

import React, {useState} from 'react';
import clsx from "clsx";

type ModalProps =  {
  show?: Boolean,
  title?: String,
  actionComponent?: React.ReactNode,
  onClose?: () => void,
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ show,title,actionComponent, children }) => {
  const [ isShow, setIsShow ] = useState(show)

  const modalStyles = {
    backgroundColor: 'rgba(0,0,0,0.51)',
  };

  return (
    <div>
      <div onClick={() => setIsShow(true)}>
        { actionComponent }
      </div>
      <div
           className={clsx(
             "overflow-y-auto  overflow-x-hidden animate-[opacityMy_.5] text-white flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-screen",
             isShow ? "" : "hidden",
           )}
           style={modalStyles}
         >
        <div className="relative p-4 w-full max-w-2xl max-h-full  animate-[fromBottom_.5s_ease-in-out_forwards]">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                { title }
              </h3>
              <button onClick={() => setIsShow(false)} type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              { children }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;