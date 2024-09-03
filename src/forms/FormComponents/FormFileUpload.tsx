import React, { useState } from 'react';

import convertStorageSize from '@/utils/convertStorageSize';

import FormFieldError from '@/forms/FormComponents/FormFieldError';

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

import { FormFileUploadProps } from '@/types/FormComponentsTypes';

const FileUploadField = ({
  name,
  label,
  accept,
  register,
  errors,
  setError,
  validationRules,
  defaultFile,
  inputGuidelines,
  acceptSize,
  resetField,
}: FormFileUploadProps) => {
  const [file, setFile] = useState<string | null>(defaultFile || null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files;

    if (selectedFile) {
      setFile(selectedFile[0]);
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
    <div className="h-fit w-1/2">
      <label htmlFor={name} className="block mb-2 text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div
        className={`relative h-fit w-full p-4 border rounded-md ${
          errors[name] ? 'border-pink-600' : 'border-gray-900/25'
        } ${file ? 'border-solid' : 'border-dashed'}`}
      >
        {file ? (
          <div className="w-full grid grid-cols-2 grid-rows-1 gap-x-2">
            <div className="size-full row-span-2 items-center">{renderIcon()}</div>
            <div className="h-full grid grid-cols-1">
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="justify-self-end p-1 size-5 cursor-pointer text-brand-200 rounded-full"
                onClick={() => handleRemoveFile()}
              />
              <div className='flex flex-col items-center'>
                <p className="text-md">{file.name}</p>
                <button className="flex items-center">
                  <p className="text-sm text-gray-400">{convertStorageSize(file.size)}</p>
                  <FontAwesomeIcon
                    icon={faCloudDownloadAlt}
                    className="p-1 size-5 cursor-pointer rounded-ful text-brand-600"
                  />
                </button>
              </div>
            </div>
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
              {...register(name, validationRules)}
              onInput={handleFileChange}
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
