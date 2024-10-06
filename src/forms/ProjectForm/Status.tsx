import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import FormButton from '@forms/FormComponents/FormButton';
import FormWrapper from '@forms/FormComponents/FormWrapper';
import FormSelect from '@forms/FormComponents/FormSelect';
import FormFieldTextArea from '@forms/FormComponents/FormTextArea';

import * as projectApi from '@api/project';

const STATUSES = ['Planning', 'Funding', 'Execution', 'Electricity Generated'];

const Status = ({ project, setProject }) => {
  const [loading, setLoading] = useState(false);

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
        toast.success('Status updated successfully');
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
