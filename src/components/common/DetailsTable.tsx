import React from 'react';
import { normalizeCamelCase } from '@utils/extractHeader';

type DetailsTableProps = {
  title?: string;
  items: { [key: string]: string };
};

const DetailsTable = ({ title, items }: DetailsTableProps) => {
  const isEmpty = Object.keys(items).length === 0;

  return (
    <div className="flow-root w-full rounded-lg border border-gray-100 py-3 shadow-sm">
      {title && (
        <h4 className="w-full mb-2 pb-3 text-xl text-center font-bold border-b-[1px]">{title}</h4>
      )}
      {isEmpty ? (
        <div className="text-center text-gray-500 py-3">No details available.</div>
      ) : (
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          {Object.entries(items).map(([key, value], index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt className="font-bold text-gray-900 capitalize">{normalizeCamelCase(key)}</dt>
              <dd className="text-gray-700 sm:col-span-2 overflow-hidden">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};

export default DetailsTable;
