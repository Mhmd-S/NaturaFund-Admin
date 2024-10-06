import React, { useEffect, useState } from 'react';

import convertStorageSize from '@utils/convertStorageSize';

import ToolTip from '@components/common/ToolTip';

import FormFieldError from '@forms/FormComponents/FormFieldError';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faUpload,
  faCloudDownloadAlt,
  faFileWord,
  faFilePdf,
  faFileExcel,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

import { ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/20/solid';

import { FormFileUploadProps } from '@types/FormComponentsTypes';
import LoadingIcon from '@components/common/LoadingIcon';

const FileUploadField = ({
  name,
  label,
  accept,
  register,
  errors,
  tip,
  clearErrors,
  validationRules,
  currentFile,
  inputGuidelines,
  acceptSize,
  resetField,
}: FormFileUploadProps) => {
  const [file, setFile] = useState<string | File | null>(currentFile || null);

  useEffect(() => {
    if (currentFile) {
      setFile(currentFile);
    }
  }, [currentFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(name); // Reset error message
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleRemoveFile = () => {
    resetField(`${name}`, { defaultValue: '' }); // Not optimal, but it works
    setFile(null);
  };

  const renderIcon = (file: File | string) => {
    if (!file) {
      return null;
    }

    const fileType = typeof file === 'string' ? file.split('.').pop() : file.type;

    if (
      fileType &&
      (fileType.includes('jpeg') || fileType.includes('png') || fileType.includes('jpg'))
    ) {
      return (
        <img
          className="size-full object-cover rounded-md"
          src={typeof file === 'string' ? file : URL.createObjectURL(file)}
          alt="Preview"
        />
      );
    }

    if (fileType && fileType.includes('pdf')) {
      return <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />;
    }

    if (fileType && fileType.includes('word')) {
      return <FontAwesomeIcon icon={faFileWord} className="text-blue-500" />;
    }

    if (fileType && fileType.includes('excel')) {
      return <FontAwesomeIcon icon={faFileExcel} className="text-green-500" />;
    }

    if (fileType && fileType.includes('powerpoint')) {
      return <FontAwesomeIcon icon={faFile} className="text-orange-500" />;
    }

    return <FontAwesomeIcon icon={faFile} className="size-12 text-gray-300" />;
  };

  return (
    <div className="h-fit w-full">
      <label
        htmlFor={name}
        className="flex items-center gap-3 mb-2 text-sm font-medium leading-6 text-gray-800"
      >
        {label}
        {tip && <ToolTip text={tip} />}
      </label>
      <div
        className={`relative h-fit w-full p-4 border rounded-md ${
          errors[name] ? 'border-pink-600' : 'border-gray-900/25'
        } ${file ? 'border-none' : 'border-dashed'}`}
      >
        {file ? (
          <div className="w-full p-2 grid grid-cols-[25%_45%_12.5%_12.5%] grid-rows-1 gap-1 place-items-center rounded-md bg-white shadow-md">
            <span className="flex items-center justify-center p-2 w-12 h-12 bg-white rounded-md">
              {renderIcon(file)}
            </span>
            <span className="w-full flex flex-col">
              <p className="w-full text-md overflow-hidden overflow-ellipsis whitespace-nowrap">
                {typeof file === 'string' ? file.split('/').pop() : file.name}
              </p>
              <p className="text-sm text-gray-400">
                {typeof file === 'string' ? 'URL' : convertStorageSize(file.size)}
              </p>
            </span>
            <a
              className="flex items-center"
              href={typeof file === 'string' ? file : URL.createObjectURL(file)}
              download={typeof file === 'string' ? file.split('/').pop() : file.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowDownTrayIcon
                stroke="currentColor"
                className="p-1 size-7 cursor-pointer rounded-ful text-gray-600"
              />
            </a>
            <TrashIcon
              stroke="currentColor"
              className="justify-self-end p-1 size-7 cursor-pointer text-gray-600 rounded-full"
              onClick={() => handleRemoveFile()}
            />
          </div>
        ) : (
          <>
            <div
              className={`h-full py-3 grid grid-rows-3 grid-cols-1 gap-2 place-items-center items-center text-gray-600 text-center ${
                file && 'hidden'
              } `}
            >
              <FontAwesomeIcon
                icon={faUpload}
                className={`size-7 ${errors[name] ? 'text-pink-700' : 'text-gray-300'}`}
              />

              <span className="text-sm">
                <span
                  className={`font-semibold ${errors[name] ? 'text-pink-700' : 'text-brand-700'}`}
                >
                  Upload a File{' '}
                </span>
                or drag and drop
              </span>
              <span className="text-xs text-gray-400">{inputGuidelines}</span>
            </div>
            <input
              type="file"
              accept={accept}
              size={acceptSize}
              {...register(name, { ...validationRules, onChange: handleFileChange })}
              className={`opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer`}
            />
          </>
        )}
      </div>
      <FormFieldError name={name} errors={errors} />
    </div>
  );
};

export default FileUploadField;
