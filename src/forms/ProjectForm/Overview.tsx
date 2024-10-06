import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import FormWrapper from '@forms/FormComponents/FormWrapper';
import FormTextArea from '@forms/FormComponents/FormTextArea';
import FileUploadField from '@forms/FormComponents/FormFileUpload';
import FormField from '@forms/FormComponents/FormField';
import FormButton from '@forms/FormComponents/FormButton';

import * as projectApi from '@api/project';

const Overview = ({ project, setProject }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: project.name,
      description: project.description,
      image: project.image,
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append each field from formData to the FormData object
    formDataToSend.set('name', formData.name);
    formDataToSend.set('description', formData.description);
    formDataToSend.set('image', formData.image[0]);

    try {
      const response = await projectApi.updateProject(project._id, formDataToSend);

      const { status, data } = response;

      if (status === 'success') {
        setProject(data);
        toast.success('Project updated successfully!');
        // Reset the form with the updated project data
        reset({
          name: data.name,
          description: data.description,
          image: data.image,
        });
      } else {
        toast.error('An error occurred, please try again.');
      }
    } catch (error) {
      toast.error('An error occurred, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} loading={loading}>
      {/* Image */}
      <FormField
        name="name"
        type="text"
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
        tip="It should be a detailed description of the project, including dates, goals, and objectives."
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
            value: 800,
            message: 'Description must be less than 800 characters long',
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
