import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faLeaf } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="h-14 col-span-2 px-6 py-2 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faLeaf} className="text-brand-900 text-3xl" />
        <span className="text-2xl font-semibold text-brand-900">NaturaFund</span>
      </div>
      <div className="p-1 text-xs flex items-center hover:bg-gray-200 rounded-lg transition-color cursor-pointer">
        <FontAwesomeIcon icon={faFlag} className="size-4 text-gray-600 p-2" />
        <p>Feedback</p>
      </div>
    </div>
  );
};

export default Header;
