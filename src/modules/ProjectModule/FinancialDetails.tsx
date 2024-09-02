import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormWrapper from '@/forms/FormComponents/FormWrapper';
import FormTextArea from '@/forms/FormComponents/FormTextArea';
import FormField from '@/forms/FormComponents/FormField';
import { FormFieldEnum } from '@/types/FormComponentsTypes';
import FormSelect from '@/forms/FormComponents/FormSelect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMehBlank, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { randomInt } from 'crypto';
import FormButton from '@/forms/FormComponents/FormButton';
import EmptyState from '@/components/common/EmptyState';

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

const FinancialDetails = () => {
  const [loading, setLoading] = useState(false);
  const [investmentDetailsFields, setInvestmentDetailsFields] = useState<String[]>([]);

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

  const renderFields = () => {
    return investmentDetailsFields.map((uid) => (
      <div key={uid} className="cols-span-2 grid grid-cols-[45%_45%_5%] place-items-center gap-4">
        <FormField
          type={FormFieldEnum.Text}
          name={`investment_field_${uid}`}
          label="Detail Label"
          register={register}
          errors={errors}
          validationRules={{
            required: 'Field is required',
          }}
        />
        <FormField
          type={FormFieldEnum.Text}
          name={`investment_value_${uid}`}
          label="Detail Value"
          register={register}
          errors={errors}
          validationRules={{
            required: 'Field is required',
          }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="text-lg text-red-500 pb-5 cursor-pointer"
          onClick={() => removeField(uid)}
        />
      </div>
    ));
  };

  const removeField = (uid) => {
    setInvestmentDetailsFields(investmentDetailsFields.filter((field) => field !== uid));
  };

  return (
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

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex  justify-between items-center">
          <h2 className="text-3xl py-4 font-semibold">Investment Details</h2>
          <button
            type="button"
            onClick={() =>
              setInvestmentDetailsFields([...investmentDetailsFields, crypto.randomUUID()])
            }
            className={`col-span-2 w-fit h-fit text-md py-2 px-3 border-2 transition-all border-brand-800 bg-brand-800 text-white rounded-lg hover:bg-white hover:text-brand-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse`}
            disabled={false} // ToDo: Add a condition to disable the button
          >
            <FontAwesomeIcon icon={faPlus} className='pr-3' />
            <label className="text-inherit text-sm">Add Field</label>
          </button>
        </div>
        {investmentDetailsFields.length ? (
          renderFields()
        ) : (
          <EmptyState
            title="No Fields Found"
            icon={faMehBlank}
            handleClick={() =>
              setInvestmentDetailsFields([...investmentDetailsFields, crypto.randomUUID()])
            }
          />
        )}
      </div>
      <FormButton text="Save Changes" />
    </FormWrapper>
  );
};

export default FinancialDetails;
