import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import FormField from '@/forms/FormComponents/FormField';

import { TableFieldProps } from '@/types/FormComponentsTypes';

const TableField = ({ item, errors, fieldArrayName, register, removeField }: TableFieldProps) => {
  return (
    <div className="cols-span-2 grid grid-cols-[45%_45%_5%] place-items-center gap-4">
      <FormField
        type="text"
        name={`${fieldArrayName}.label`}
        label="Detail Label"
        register={register}
        errors={errors}
        defaultValue={item.label}
        validationRules={{
          required: 'Field is required',
        }}
      />
      <FormField
        type="text"
        name={`${fieldArrayName}.value`}
        label="Detail Value"
        register={register}
        errors={errors}
        defaultValue={item.label}
        validationRules={{
          required: 'Field is required',
        }}
      />
      <FontAwesomeIcon
        icon={faTrash}
        className="text-lg text-red-500 pb-5 cursor-pointer"
        onClick={() => removeField()}
      />
    </div>
  );
};

export default TableField;
