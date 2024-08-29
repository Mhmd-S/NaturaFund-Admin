import React, { useState } from "react";
import axios from "axios";

import FormFieldError from "@/forms/formComponents/FormFieldError";

import { validateImage } from "@/utils/validateImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faTrashAlt, faUpload, faCheck } from "@fortawesome/free-solid-svg-icons";

// ToDo: Refactore the component to upload directly to the server with the need for the user to submit the form

const FileUploadField = ({
    name,
    label,
    register,
    errors,
    setError,
    validationRules,
    usersPicture,
    resetField,
    ...inputProps
}) => {
    const [file, setFile] = useState(usersPicture);
    const [loading, setLoading] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const handleFileChange = async (event) => {
        setLoading(true);
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const result = await validateImage(selectedFile, 3000000); // 3MB

            if (!result.valid) {
                setError(`${name}`, { type: "manual", message: result.message });
                setLoading(false);
                return;
            }

            setFile(selectedFile);
            // Upload file and update the percentage
            const formData = new FormData();
            formData.append("file", selectedFile);
            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }
        setLoading(false);
    };

    const handleRemoveFile = () => {
        resetField(`${name}`, { defaultValue: "" }); // Not optimal, but it works
        setFile(null);
    };

    return (
        <div className="h-fit">
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div
                className={`relative h-full w-full px-4 pt-4 border rounded-md ${
                    errors[name] ? "border-pink-600" : "border-gray-900/25"
                } ${file ? "border-solid" : "border-dashed"}`}
            >
                {file ? (
                    <div className="w-full grid grid-cols-[10%_80%_10%] grid-rows-2 items-center">
                        <img
                            className="size-10 object-cover rounded-md"
                            src={typeof file == "string" ? file : URL.createObjectURL(file)}
                            alt="Preview"
                        />
                        <div className="flex flex-col">
                            <text className="text-sm">File_Name</text>
                            <text className="text-xs text-gray-400">6 MB</text>
                        </div>
                        <div className="flex justify-center items-center gap-2 text-gray-300">
                            <FontAwesomeIcon
                                icon={file ? faCheck : faPause}
                                className={`p-1 size-3 cursor-pointer rounded-full ${file && "text-white bg-green-500"}`}
                            />

                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="p-1 size-4 cursor-pointer"
                                onClick={() => {
                                    handleRemoveFile();
                                    inputProps?.handleDeleteImage();
                                }}
                            />
                        </div>
                        <div className="col-span-3 justify-self-center w-full flex items-center gap-3">
                            <div className="relative col-span-3 justify-self-center w-full h-2 bg-gray-300 rounded-full">
                                <div className="absolute w-1/2 h-full bg-brand-900 rounded-full" />
                            </div>
                            <text className="text-xs">95%</text>
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            htmlFor={name}
                            className={`h-full py-3 grid grid-rows-3 grid-cols-1 gap-2 place-items-center items-center text-gray-600 text-center ${
                                file && "hidden"
                            } `}
                        >
                            <FontAwesomeIcon
                                icon={faUpload}
                                className={`size-7 ${errors[name] ? "text-pink-700" : "text-gray-300"}`}
                            />

                            <span className="text-sm">
                                <span
                                    className={`font-semibold ${errors[name] ? "text-pink-700" : "text-brand-700"}`}
                                >
                                    Upload a File{" "}
                                </span>
                                or drag and drop
                            </span>
                            <span className="text-xs text-gray-400">PNG, JPG, GIF up to 3MB</span>
                        </div>
                        <input
                            type="file"
                            name={name}
                            accept="image/png, image/gif, image/jpeg"
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
