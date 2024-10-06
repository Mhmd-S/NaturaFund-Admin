import React from 'react';
import FormFieldError from './FormFieldError';
import ToolTip from '@/components/common/ToolTip';

import { FormTextAreaProps } from '@/types/FormComponentsTypes';

const FormFieldTextArea = ({
  errors,
  label,
  name,
  register,
  tip,
  validationRules,
  defaultValue,
  placeholder,
  ...inputProps
}: FormTextAreaProps) => {
  return (
    <div className="w-full flex flex-col">
      <label
        htmlFor={name}
        className="flex items-center gap-3 mb-2 text-sm font-medium leading-6 text-gray-800"
      >
        {label}
        {tip && <ToolTip text={tip} />}
      </label>

      <textarea
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(name, validationRules)}
        {...inputProps}
        className={`block w-full h-24 rounded-sm p-2 py-3 text-gray-900 outline-none border-[1px] border-gray-300 placeholder:text-gray-400  focus:border-brand-800  sm:text-sm sm:leading-6' ${errors[name] && ' border-pink-800 active:border-3'}`}
      />

      <FormFieldError name={name} errors={errors} />
    </div>
  );
};

export default FormFieldTextArea;
