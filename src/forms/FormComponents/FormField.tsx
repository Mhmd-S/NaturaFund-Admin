import React from 'react';
import FormFieldError from '@/forms/FormComponents/FormFieldError';
import { FormFieldProps } from '@/types/FormComponentsTypes';

const FormField = ({
  label,
  name,
  type,
  register,
  errors,
  validationRules,
  defaultValue,
  placeholder,
}: FormFieldProps) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="block mb-2 text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(name, validationRules)}
        className={`block w-full rounded-sm px-2 py-3 text-gray-900 outline-none border-[1px] border-gray-300 placeholder:text-gray-400  focus:border-brand-800  sm:text-sm sm:leading-6' ${errors[name] && ' border-pink-800 active:border-3'}`}
      />

      <FormFieldError name={name} errors={errors} />
    </div>
  );
};

export default FormField;
