import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormButton from '@forms/FormComponents/FormButton';
import FormWrapper from '@forms/FormComponents/FormWrapper';
import FormSelect from '@forms/FormComponents/FormSelect';
import FormFieldTextArea from '@forms/FormComponents/FormTextArea';

import * as projectApi from '@api/project';

const STATUSES = ['Planning', 'Funding', 'Execution', 'Electricity Generated'];

const Status = ({ project, setProject }) => {
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
      const response = await projectApi.updateProject(project._id, formData);

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
    <FormWrapper onSubmit={handleSubmit(onSubmit)} loading={loading}>
      {isSuccess && (
        <div className="bg-green-200 border-green-400 border-l-4 p-4 mb-4">
          <p className="text-green-700">Project Updated Successfully!</p>
        </div>
      )}
      {updateError && (
        <div className="bg-red-200 border-red-400 border-l-4 p-4 mb-4">
          <p className="text-red-700">{updateError}</p>
        </div>
      )}
      <FormSelect
        name="status.current"
        label="Current Status"
        options={STATUSES}
        defaultValue={project.status.current}
        register={register}
        errors={errors}
        validationRules={{
          require: 'Status is required',
        }}
      />

      <FormFieldTextArea
        rows={5}
        name="status.description"
        label="Description"
        placeholder="Enter description"
        defaultValue={project.status.description}
        register={register}
        errors={errors}
        validationRules={{
          required: 'Description is required',
          minLength: {
            value: 100,
            message: 'Description should be at least 10 characters',
          },
          maxLength: {
            value: 500,
            message: 'Description should not exceed 500 characters',
          },
        }}
      />
      <FormButton type="submit" text="Save" />
    </FormWrapper>
  );
};

export default Status;
