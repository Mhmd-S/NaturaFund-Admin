import { UseFormRegister, FieldValues } from "react-hook-form";

export enum FormFieldEnum {
    Text = "text",
    Email = "email",
    Password = "password",
    Number = "number",
    Date = "date",
    Time = "time",
    Datetime = "datetime",
    Datetime_Local = "datetime-local",
    Month = "month",
    Week = "week",
    Color = "color",
}

export interface FormFieldProps {
    label: string;
    name: string;
    type: FormFieldEnum;
    register: UseFormRegister<FieldValues>;
    errors: any;
    validationRules: any;
    defaultValue: string;
    placeholder: string;
}