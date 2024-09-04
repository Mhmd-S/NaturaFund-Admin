import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DetailsTable from '@/components/common/DetailsTable';
import FormWrapper from '@/forms/FormComponents/FormWrapper';
import FormTextArea from '@/forms/FormComponents/FormTextArea';
import FileUploadField from '@/forms/FormComponents/FormFileUpload';
import FormField from '@/forms/FormComponents/FormField';
import FormButton from '@/forms/FormComponents/FormButton';

const Overview = () => {
  const [loading, setLoading] = useState(false);

  let project = {
    projectName: 'Project Name',
    description: 'Project Description',
    company: {
      name: 'Company Name',
      email: 'Company Email',
      phone: 'Company Phone',
      address: 'Company Address',
      city: 'Company City',
      state: 'Company State',
      zip: 'Company Zip',
      country: 'Company Country',
      introduction: 'Company Introduction',
    },
  };

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    // ToDo: Return the upload url to the data
  };

  const getCompanyDetails = () => {
    const companyDetails = project.company;
    const { description, ...rest } = companyDetails;
    return rest;
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} loading={loading}>
      {/* Image */}
      <FormField
        name="projectName"
        type="text"
        defaultValue={project.projectName}
        label="Project Name"
        register={register}
        errors={errors}
        placeholder="ex. John"
        validationRules={{
          required: 'Project name is required',
          pattern: {
            value: /^[a-zA-Z]{1,24}$/,
            message:
              'Project name must only contain letters and must be less than 24 characters long',
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
      {/* Company Introduction */}
      <FormTextArea
        rows={5}
        name="introduction"
        label="Company Introduction"
        register={register}
        defaultValue={project.company.introduction}
        errors={errors}
        placeholder="ex. Lorem Inc. was founded in 1947..."
        validationRules={{
          required: 'Company introduction is required',
          minLength: {
            value: 100,
            message: 'Company introduction must be at least 100 characters long',
          },
          maxLength: {
            value: 500,
            message: 'Company introduction must be less than 500 characters long',
          },
        }}
      />
      {/* File Upload */}
      <FileUploadField
        name="file"
        accept="image/jpeg, image/png, image/jpg"
        acceptSize={3000000}
        inputGuidelines="PNG, JPG, JPEG up to 3MB"
        label="Upload Project Image"
        currentFile={project.image}
        resetField={resetField}
        register={register}
        errors={errors}
        setError={setError}
        validationRules={{
          required: 'Project image is required',
        }}
      />
      <div className="w-1/2 mb-4">
        <h2 className="text-3xl py-4 font-semibold">Company Info</h2>
        {/* ToDo: Add hyperlink that takes you to the company tab to edit */}
        <DetailsTable items={getCompanyDetails()} />
      </div>
      <FormButton
        text="Save Changes"
        type="submit"
      />
    </FormWrapper>
  );
};

export default Overview;
