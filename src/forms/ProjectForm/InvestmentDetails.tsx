import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import FormWrapper from '@forms/FormComponents/FormWrapper';
import FormTextArea from '@forms/FormComponents/FormTextArea';
import FormSelect from '@forms/FormComponents/FormSelect';
import FormButton from '@forms/FormComponents/FormButton';
import TableForm from '@forms/FormComponents/TablesForm';

import * as projectApi from '@api/project';

const InvestmentDetails = ({ project, setProject }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const investmentDetails = {
        description: formData.description,
        type: formData.type,
        energyType: formData.energyType,
        features: project?.investmentDetails?.features || [],
      };

      const response = await projectApi.updateProject(project._id, {
        investmentDetails: investmentDetails,
      });

      const { status } = response;

      if (status === 'success') {
        setProject(response.data);
        toast.success('Investment Details updated successfully');
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
    <>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} loading={loading}>
        <FormTextArea
          rows={5}
          name="description"
          label="Investment Description"
          defaultValue={project?.investmentDetails?.description || ''}
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
          name="type"
          register={register}
          errors={errors}
          defaultValue={project?.investmentDetails?.type || ''}
          validationRules={{
            required: 'Investment Vehicle is required',
          }}
        />
        <FormSelect
          options={['Solar', 'Hydro', 'Wind', 'Biomass']}
          label="Investment Energy Type"
          name="energyType"
          register={register}
          errors={errors}
          defaultValue={project?.investmentDetails?.energyType || ''}
          validationRules={{
            required: 'Investment Vehicle is required',
          }}
        />
        <FormButton text="Save Changes" type="submit" />
      </FormWrapper>
      <TableForm
        project={project}
        setProject={setProject}
        category="investmentDetails"
        tip="A field for price should be added. This the field's name should be the investment type followed by 'price'. For example, if the investment type is 'Bond', the field name should be 'Bond  Price'. Do not include the currency symbol."
        name="features"
        defaultValues={project?.investmentDetails?.features || ''}
      />
    </>
  );
};

export default InvestmentDetails;
