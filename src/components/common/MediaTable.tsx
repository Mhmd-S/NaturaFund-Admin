import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

const MediaTable = ({ items }) => {
  return (
    <ul role="list" className="max-h-64 divide-y divide-gray-100 rounded-md border border-gray-200 overflow-y-auto">
      {Object.entries(items).map(([key, value], index) => (
        <li
          key={index}
          className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
        >
          <div className="flex w-0 flex-1 items-center">
            <FontAwesomeIcon
              icon={faPaperclip}
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-gray-400"
            />
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium capitalize">{key}</span>
              <span className="flex-shrink-0 text-gray-400">1.9 mb</span>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Download
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MediaTable;
