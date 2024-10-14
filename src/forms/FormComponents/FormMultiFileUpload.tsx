import React, { useState, useEffect } from 'react';
import convertStorageSize from '@utils/convertStorageSize';
import FormFieldError from '@forms/FormComponents/FormFieldError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faFileWord,
  faFilePdf,
  faFileExcel,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import { TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { FormFileUploadFieldProps } from '@types/FormComponentsTypes';
import LoadingIcon from '@components/common/LoadingIcon';

const FileUploadField = ({
  name,
  label,
  accept,
  register,
  errors,
  validationRules,
  setValue,
  defaultFiles,
  inputGuidelines,
  acceptSize,
  resetField,
}: FormFileUploadFieldProps) => {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (defaultFiles && defaultFiles.length > 0) {
        const fetchedFiles = await Promise.all(
          defaultFiles.map(async (fileUrl) => {
            const response = await fetch(fileUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/pdf',
                'referrer-policy': 'origin-when-cross-origin',
              },
            });
            const blob = await response.blob();
            const fileName = fileUrl.split('/').pop() || 'defaultFileName';
            return new File([blob], fileName, { type: blob.type });
          })
        );
        setFiles(fetchedFiles);
        setValue(name, fetchedFiles);
      }
      setLoading(false);
    };

    fetchFiles();
  }, [defaultFiles, name, setValue]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = [...files, ...Array.from(selectedFiles)];
      setFiles(newFiles);
      setValue(name, newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setValue(name, newFiles.length > 0 ? newFiles : null);
    if (newFiles.length === 0) {
      resetField(name, { defaultValue: '' });
    }
  };

  const renderIcon = (file: File) => {
    const fileType = file.type;

    if (fileType.includes('jpeg') || fileType.includes('png') || fileType.includes('jpg')) {
      return (
        <img
          className="size-full object-cover rounded-md"
          src={URL.createObjectURL(file)}
          alt="Preview"
        />
      );
    }

    if (fileType.includes('pdf')) {
      return <FontAwesomeIcon icon={faFilePdf} className="size-8 text-red-500" />;
    }

    if (fileType.includes('word')) {
      return <FontAwesomeIcon icon={faFileWord} className="size-8 text-blue-500" />;
    }

    if (fileType.includes('excel')) {
      return <FontAwesomeIcon icon={faFileExcel} className="size-8 text-green-500" />;
    }

    if (fileType.includes('powerpoint')) {
      return <FontAwesomeIcon icon={faFile} className="size-8 text-orange-500" />;
    }

    return <FontAwesomeIcon icon={faFile} className="size-8 text-gray-300" />;
  };

  const renderFiles = () => {
    return files.map((file, index) => (
      <li
        key={index}
        className="w-full p-2 grid grid-cols-[25%_45%_12.5%_12.5%] grid-rows-1 gap-1 place-items-center rounded-md bg-white shadow-md"
      >
        <span className="flex items-center justify-center p-2 w-12 h-12 bg-white rounded-md">
          {renderIcon(file)}
        </span>
        <span className="w-full flex flex-col">
          <p className="w-full text-md overflow-hidden overflow-ellipsis whitespace-nowrap">
            {file.name}
          </p>
          <p className="text-sm text-gray-400">{convertStorageSize(file.size)}</p>
        </span>
        <a
          className="flex items-center"
          href={URL.createObjectURL(file)}
          download={file.name}
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
          onClick={() => handleRemoveFile(index)}
        />
      </li>
    ));
  };

  return (
    <div className="h-96 w-full mb-20">
      <label htmlFor={name} className="block mb-2 text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div
        className={`h-full w-full border rounded-md grid grid-cols-[30%_70%] ${
          errors[name] ? 'border-pink-600' : 'border-gray-900/25'
        } ${files.length ? 'border-solid' : 'border-dashed'}`}
      >
        {loading ? (
          <div className="col-span-2 flex items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          <>
            {/* Files Uploaded */}
            <ul className="h-full w-full border-r-2 rounded-l-md flex flex-col gap-8 bg-gray-100 px-4 py-8 overflow-y-scroll">
              {files.length > 0 && renderFiles()}
            </ul>

            {/* Uploaed Field */}
            <div className="relative h-full p-4 flex flex-col justify-center items-center gap-2 text-gray-600 text-center">
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
              <input
                type="file"
                accept={accept}
                size={acceptSize}
                {...register(name, validationRules)}
                onInput={handleFileChange}
                className={`opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer`}
                multiple
              />
            </div>
          </>
        )}
      </div>
      <FormFieldError name={name} errors={errors} />
    </div>
  );
};

export default FileUploadField;