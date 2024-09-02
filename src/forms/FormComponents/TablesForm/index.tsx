import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { faMehRollingEyes, faPlus } from '@fortawesome/free-solid-svg-icons';

import { FormFieldEnum } from '@/types/FormComponentsTypes';

import FormField from '@/forms/FormComponents/FormField';
import FormButton from '@/forms/FormComponents/FormButton';

import EmptyState from '@/components/common/EmptyState';
import TableField from './TableField';
import FormWrapper from '../FormWrapper';

const TableForm = ({ title }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'table',
    rules: {
      required: 'Please add at least 1 item',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const renderFields = () => {
    return fields.map((table, index) => (
      <TableField
        key={table.id}
        fieldArrayName={`table[${index}]`}
        removeField={() => remove(index)}
        register={register}
        errors={errors}
      />
    ));
  };

  return (
    <FormWrapper loading={false} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-[50%_40%] grid-rows-1  place-items-center justify-between">
          <FormField
            type={FormFieldEnum.Text}
            name="table_name"
            label="Table Name"
            register={register}
            errors={errors}
            validationRules={{
              required: 'Field is required',
            }}
          />
          <span className="w-full pb-4 flex justify-between items-center gap-4">
            <FormButton
              type="button"
              onClick={() => append({ label: '', value: '' })}
              icon={faPlus}
              text={'Add a Field'}
            />
            <FormButton text="Save Table" type="submit" />
          </span>
        </div>
        {fields.length ? (
          renderFields()
        ) : (
          <EmptyState
            title="This table is empty!"
            icon={faMehRollingEyes}
            handleClick={() => append({ label: '', value: '' })}
          />
        )}
      </div>
    </FormWrapper>
  );
};

export default TableForm;
