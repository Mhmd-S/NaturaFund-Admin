import { useForm } from 'react-hook-form';
import FormButton from '@/forms/FormComponents/FormButton';
import FormWrapper from '@/forms/FormComponents/FormWrapper';
import FormSelect from '@/forms/FormComponents/FormSelect';
import FormFieldTextArea from '@/forms/FormComponents/FormTextArea';

const STATUSES = ['Planning', 'Funding', 'Execution', 'Electricity Generated'];

const  STATUS = {
  status: 'Planning',
  description: 'This project is in the planning stage',
}

const Status = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <FormWrapper
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      loading={false}
    >
      <FormSelect
        name="status"
        label="Status"
        options={STATUSES}
        defaultValue={STATUS.status}
        register={register}
        errors={errors}
        validationRules={{
          require: 'Status is required',
        }}
      />

      <FormFieldTextArea
        rows={5}
        name="description"
        label="Description"
        placeholder="Enter description"
        defaultValue={STATUS.description}
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
