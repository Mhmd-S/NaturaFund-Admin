import { useState } from 'react';
import { useForm } from 'react-hook-form';

import DetailsTable from '@components/common/DetailsTable';

import FormWrapper from '@forms/FormComponents/FormWrapper';
import FormTextArea from '@forms/FormComponents/FormTextArea';
import FileUploadField from '@forms/FormComponents/FormFileUpload';
import FormField from '@forms/FormComponents/FormField';
import FormButton from '@forms/FormComponents/FormButton';

import * as projectApi from '@api/project';

const Overview = ({ project }) => {
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    resetField,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    setUpdateError(null);

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append each field from formData to the FormData object
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image[0]);

    try {
      const response = await projectApi.updateProject(project._id, formDataToSend);

      const { status } = response;

      if (status === 'success') {
        setIsSuccess(true);
      } else {
        setUpdateError('An error occurred, please try again.');
      }
    } catch (error) {
      setUpdateError('An error occurred, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} loading={loading}>
      {isSuccess && (
        <div className="bg-green-200 border-green-400 border-l-4 p-4 mb-4">
          <p className="text-green-700">Updated Project Successfully!</p>
        </div>
      )}
      {updateError && (
        <div className="bg-red-200 border-red-400 border-l-4 p-4 mb-4">
          <p className="text-red-700">{updateError}</p>
        </div>
      )}
      {/* Image */}
      <FormField
        name="name"
        type="text"
        defaultValue={project.name}
        label="Project Name"
        register={register}
        errors={errors}
        placeholder="ex. John"
        validationRules={{
          required: 'Project name is required',
          minLength: {
            value: 5,
            message: 'Project name must be at least 5 characters long',
          },
          maxLength: {
            value: 50,
            message: 'Project name must be less than 50 characters long',
          },
        }}
      />
      {/* Description */}
      <FormTextArea
        rows={5}
        name="description"
        label="Project Description"
        defaultValue={project.description}
        register={register}
        errors={errors}
        placeholder="ex. This project aims to..."
        validationRules={{
          required: 'Description is required',
          minLength: {
            value: 100,
            message: 'Description must be at least 100 characters long',
          },
          maxLength: {
            value: 500,
            message: 'Description must be less than 500 characters long',
          },
        }}
      />
      {/* File Upload */}
      <FileUploadField
        name="image"
        accept="image/jpeg, image/png, image/jpg"
        acceptSize={3000000}
        inputGuidelines="PNG, JPG, JPEG up to 3MB"
        label="Upload Project Image"
        currentFile={project.image}
        resetField={resetField}
        register={register}
        errors={errors}
        setError={setError}
        clearErrors={clearErrors}
        validationRules={{
          required: 'Project image is required',
        }}
      />
      <FormButton text="Save Changes" type="submit" />
    </FormWrapper>
  );
};

export default Overview;
