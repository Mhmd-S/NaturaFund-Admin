import { useEffect, useState } from 'react';
import { set, useFieldArray, useForm } from 'react-hook-form';

import { faMehRollingEyes, faPlus } from '@fortawesome/free-solid-svg-icons';

import { TableFormProps } from '@/types/FormComponentsTypes';

import FormField from '@/forms/FormComponents/FormField';
import FormButton from '@/forms/FormComponents/FormButton';
import EmptyState from '@/components/common/EmptyState';
import FormWrapper from '@/forms/FormComponents/FormWrapper';

import TableField from '@/forms/FormComponents/TablesForm/TableField';

type FormSubmitParams = {
  table_name: string;
  [key: string]: { label: string; value: string }[];
};

type FormSubmitOutput = {
  tableName: string;
  [key: string]: string;
};

const TableForm = ({ name, defaultValues }: TableFormProps) => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: {
      required: 'Please add at least 1 item',
    },
  });

  const onSubmit = (data: FormSubmitParams) => {
    // From arry of labels and values to object
    let obj: FormSubmitOutput = {
      tableName: data.table_name,
    };

    data[name].map((item) => {
      obj[item.label] = item.value;
    });

    console.log(obj);
  };

  const renderFields = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return fields.map((item, index) => (
      <TableField
        key={item.id}
        item={item}
        fieldArrayName={`${name}[${index}]`}
        removeField={() => remove(index)}
        register={register}
        errors={errors}
      />
    ));
  };

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).map((item) => append({ label: item, value: defaultValues[item] }));
    }
    setLoading(false);
  }, []);

  return (
    <FormWrapper loading={false} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-[50%_40%] grid-rows-1  place-items-center justify-between">
          <FormField
            type='text'
            name="table_name"
            label="Table Name"
            defaultValue={name}
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
        {defaultValues ? (
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
