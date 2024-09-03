import {  useState } from 'react';
import { useForm } from 'react-hook-form';

import FormWrapper from '@/forms/FormComponents/FormWrapper';
import FormTextArea from '@/forms/FormComponents/FormTextArea';
import FormSelect from '@/forms/FormComponents/FormSelect';
import FormButton from '@/forms/FormComponents/FormButton';
import TableForm from '@/forms/FormComponents/TablesForm';

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

const InvestmentDetails = () => {
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} loading={loading}>
        {/* Investment Description */}
        <FormTextArea
          rows={5}
          name="investment_description"
          label="Investment Description"
          defaultValue={project.description}
          register={register}
          errors={errors}
          placeholder="ex. This project aims to..."
          validationRules={{
            required: 'Description is required',
            minLength: {
              value: 250,
              message: 'Description must be at least 250 characters long',
            },
            maxLength: {
              value: 700,
              message: 'Description must be less than 700 characters long',
            },
          }}
        />

        <FormSelect
          options={['Bond', 'Equity', 'RESCO']}
          label="Investment Vehicle"
          name="investment_vehicle"
          register={register}
          errors={errors}
          validationRules={{
            required: 'Investment Vehicle is required',
          }}
        />
        <FormButton text="Save Changes" type="submit" />
      </FormWrapper>
      <TableForm name="investmentDetails" defaultValues={project.company} />
    </>
  );
};

export default InvestmentDetails;
