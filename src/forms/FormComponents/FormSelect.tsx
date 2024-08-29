import React from "react";
import FormFieldError from "@/forms/formComponents/FormFieldError";

function FormSelect({ register, options, name, label, errors, validationRules }) {
    return (
        <div className="w-full flex flex-col">
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <select
                className={`block w-full rounded-sm p-3 text-gray-900 outline-none border-[1px] border-gray-300 placeholder:text-gray-400 focus:border-brand-800 sm:text-sm sm:leading-6' ${errors[name] && " border-pink-800 active:border-3"}`}
                {...register(name, validationRules)}
                name={name}
                id={name}
                placeholder={`Select ${label}`}
            >
                <option key="default" value="DEFAULT">
                    Select {label}
                </option>
                {options.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            <FormFieldError name={name} errors={errors} />
        </div>
    );
}

export default FormSelect;
