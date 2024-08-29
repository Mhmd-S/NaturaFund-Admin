import React from "react";

const FormFieldError = ({ errors, name }) => {
    const errorMessage = errors[name]?.message || " ";

    return (
        <div className="w-full min-h-12">
            <p
                className={`min-w-[1px] min-h-full py-2 w-full h-full text-pink-600 ${errorMessage ? "visible" : "invisible"}`}
            >
                {errorMessage}
            </p>
        </div>
    );
};

export default FormFieldError;
