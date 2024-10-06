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
    <div className="relative">
      <FontAwesomeIcon
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        icon={faQuestionCircle}
      />
      <span className={`absolute bg-slate-200/35`}>{text}</span>
    </div>
  );
};

export default ToolTip;
