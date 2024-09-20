import { useEffect, useState } from 'react';
import { set, useFieldArray, useForm } from 'react-hook-form';

import { faMehRollingEyes, faPlus } from '@fortawesome/free-solid-svg-icons';

import { TableFormProps } from '@types/FormComponentsTypes';

import FormField from '@forms/FormComponents/FormField';
import FormButton from '@forms/FormComponents/FormButton';
import EmptyState from '@components/common/EmptyState';
import FormWrapper from '@forms/FormComponents/FormWrapper';
import TableField from '@forms/FormComponents/TablesForm/TableField';

import * as projectApi from '@api/project';
import LoadingIcon from '@components/common/LoadingIcon';

type FormSubmitParams = {
  [key: string]: { label: string; value: string }[];
};

const TableForm = ({ project, category, name, defaultValues }: TableFormProps) => {
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

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

  const onSubmit = async (formData: FormSubmitParams) => {
    setLoading(true);
    setUpdateError(null);

    const tableData = formData[name].reduce((acc, item) => {
      acc[item.label] = item.value;
      return acc;
    }, {});

    const objectToSend = {
      ...project[category],
      [formData.name]: tableData,
    };

    try {
      const response = await projectApi.updateProject(project._id, { [category]: objectToSend });

      if (response?.status === 'success') {
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

  const renderFields = () => {
    if (loading) {
      return <LoadingIcon />;
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
    <FormWrapper loading={loading} onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && (
        <div className="bg-green-200 border-green-400 border-l-4 p-4 mb-4">
          <p className="text-green-700">Updated Project Successfully!</p>
        </div>
      )}
      {updateError && (
        <div className="bg-red-200 border-red-400 border-l-4 p-4 mb-4">
          <p className="text-red-700">{updateError}</p>
        </div>
      )}
      <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-[50%_40%] grid-rows-1  place-items-center justify-between">
          <h3 className="w-full h-full text-4xl font-semibold text-brand-800 capitalize">{name} Table</h3>
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
