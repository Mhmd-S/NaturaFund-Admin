import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DetailsTable from '@/components/common/DetailsTable';
import FormWrapper from '@/forms/FormComponents/FormWrapper';
import FormTextArea from '@/forms/FormComponents/FormTextArea';
import FileUploadField from '@/forms/FormComponents/FormFileUpload';
import FormField from '@/forms/FormComponents/FormField';
import { FormFieldEnum } from '@/types/FormComponentsTypes';

const Overview = () => {
  const [loading, setLoading] = useState(false);

  let project = {
    projectName: 'Project Name',
    description: 'Project Description',
    owner: {
      name: 'Company Name',
      email: 'Company Email',
      phone: 'Company Phone',
      address: 'Company Address',
      city: 'Company City',
      state: 'Company State',
      zip: 'Company Zip',
      country: 'Company Country',
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
    const companyDetails = project.owner;
    const { description, ...rest } = companyDetails;
    return rest;
  };

  return (
      <FormWrapper onSubmit={handleSubmit(onSubmit)} loading={loading}>
        {/* Image */}
        <FormField
          name="projectName"
          type={FormFieldEnum.Text}
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
            required: 'Address is required',
            pattern: {
              value:
                /^\d+,\s?[A-Za-z\s]+(?:,\s?[A-Za-z\s]+)*,\s?\d{5}\s?[A-Za-z\s]+,\s?[A-Za-z\s]+$/,
              message:
                'The address should include: street number, street name, region, and town/city, state.',
            },
          }}
        />
        {/* Company Introduction */}
        <FormTextArea
          row={5}
          name="description"
          label="Project Description"
          register={register}
          defaultValue={project.description}
          errors={errors}
          placeholder="ex. This project aims to..."
          validationRules={{
            required: 'Address is required',
            pattern: {
              value:
                /^\d+,\s?[A-Za-z\s]+(?:,\s?[A-Za-z\s]+)*,\s?\d{5}\s?[A-Za-z\s]+,\s?[A-Za-z\s]+$/,
              message:
                'The address should include: street number, street name, region, and town/city, state.',
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
        <div>
          <h2 className="text-3xl py-4 font-semibold">Company Info</h2>
          <DetailsTable items={getCompanyDetails()} />
        </div>
      </FormWrapper>
  );
};

export default Overview;
