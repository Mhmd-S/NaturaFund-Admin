import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import FormField from '@/forms/FormComponents/FormField';

import { FormFieldEnum } from '@/types/FormComponentsTypes';
import { TableFieldProps } from '@/types/FormComponentsTypes';

const TableField = ({ errors, fieldArrayName, register, removeField }: TableFieldProps) => {
  return (
    <div className="cols-span-2 grid grid-cols-[45%_45%_5%] place-items-center gap-4">
      <FormField
        type={FormFieldEnum.Text}
        name={`${fieldArrayName}.label`}
        label="Detail Label"
        register={register}
        errors={errors}
        validationRules={{
          required: 'Field is required',
        }}
      />
      <FormField
        type={FormFieldEnum.Text}
        name={`${fieldArrayName}.value`}
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
        onClick={() => removeField()}
      />
    </div>
  );
};

export default TableField;
