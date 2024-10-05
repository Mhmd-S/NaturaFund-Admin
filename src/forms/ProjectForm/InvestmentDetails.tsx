import { useState } from 'react';
import { useForm } from 'react-hook-form';

import FormWrapper from '@forms/FormComponents/FormWrapper';
import FormTextArea from '@forms/FormComponents/FormTextArea';
import FormSelect from '@forms/FormComponents/FormSelect';
import FormButton from '@forms/FormComponents/FormButton';
import TableForm from '@forms/FormComponents/TablesForm';

import SuccessMessage from '@components/common/SuccessMessage';

import * as projectApi from '@api/project';

const InvestmentDetails = ({ project, setProject }) => {
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

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
    <>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} loading={loading}>
        {isSuccess && (
          <SuccessMessage message="Investment Details updated successfully" />
        )}
        {updateError && (
          <div className="bg-red-200 border-red-400 border-l-4 p-4 mb-4">
            <p className="text-red-700">{updateError}</p>
          </div>
        )}
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
        name="features"
        defaultValues={project?.investmentDetails?.features || ''}
      />
    </>
  );
};

export default InvestmentDetails;