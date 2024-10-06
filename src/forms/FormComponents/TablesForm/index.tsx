import { useEffect, useState } from 'react';
import { set, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { faMeh, faPlus } from '@fortawesome/free-solid-svg-icons';

import { TableFormProps } from '@types/FormComponentsTypes';

import FormButton from '@forms/FormComponents/FormButton';
import EmptyState from '@components/common/EmptyState';
import FormWrapper from '@forms/FormComponents/FormWrapper';
import TableField from '@forms/FormComponents/TablesForm/TableField';

import * as projectApi from '@api/project';

import LoadingIcon from '@components/common/LoadingIcon';

import { normalizeCamelCase } from '@utils/extractHeader';

type FormSubmitParams = {
  [key: string]: { label: string; value: string }[];
};

const TableForm = ({ project, setProject, category, name, defaultValues }: TableFormProps) => {
  const [loading, setLoading] = useState(false);

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
    const tableData = formData[name].reduce((acc, item) => {
      acc[item.label] = item.value;
      return acc;
    }, {});

    const objectToSend = {
      ...project[category],
      [name]: tableData,
    };

    try {
      const response = await projectApi.updateProject(project._id, { [category]: objectToSend });

      if (response?.status === 'success') {
        setProject(response.data);
        toast.success('Table updated successfully');
      } else {
        toast.error('An error occurred, please try again.');
      }
    } catch (error) {
      toast.error('An error occurred, please try again.');
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
      <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-[50%_40%] grid-rows-1  place-items-center justify-between">
          <h3 className="w-full h-full text-4xl font-semibold text-brand-800 capitalize">
            {normalizeCamelCase(name)} Table
          </h3>
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
        {fields.length > 0 ? (
          renderFields()
        ) : (
          <EmptyState
            title="This table is empty! Please add a field."
            icon={faMeh}
            handleClick={() => append({ label: '', value: '' })}
          />
        )}
      </div>
    </FormWrapper>
  );
};

export default TableForm;
