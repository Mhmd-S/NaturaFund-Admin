import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon: IconProp;
  buttonLabel?: string;
  handleClick?: () => void;
};

const EmptyState = ({ title, description, icon, buttonLabel, handleClick }: EmptyStateProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <FontAwesomeIcon icon={icon} className="text-5xl text-gray-300" />
      <h3>{title}</h3>
      {description && <p className="text-gray-400">{description}</p>}
      {buttonLabel && (
        <button
          className="flex items-center gap-4 bg-brand-900 px-4 py-2 rounded-md text-white hover:bg-brand-600"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>{buttonLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
