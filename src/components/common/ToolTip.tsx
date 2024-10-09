import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const ToolTip = ({ text }) => {
  const [displayText, setDisplayText] = useState(false);

  const handleMouseEnter = () => {
    setDisplayText(true);
  };

  const handleMouseLeave = () => {
    setDisplayText(false);
  };

  return (
    <div className="relative inline-block items-center">
      <FontAwesomeIcon
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        icon={faQuestionCircle}
        className="cursor-pointer text-gray-600 text-xl"
      />
      <p
        className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-52 p-3 bg-gray-800/85 text-white text-sm font-normal rounded-lg shadow-lg transition-opacity duration-300 normal-case ${
          displayText ? 'opacity-100' : 'opacity-0 sr-only'
        }`}
        style={{ top: '24px' }}
      >
        {text}
      </p>
    </div>
  );
};

export default ToolTip;
