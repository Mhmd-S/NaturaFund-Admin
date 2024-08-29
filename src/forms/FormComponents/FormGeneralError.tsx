import React from "react";

const FormGeneralError = ({ message }) => {
    return (
        <>
            {message && (
                <div className="text-red-500 text-center rounded-lg bg-[rgba(239,68,68,0.09)] border-2 border-red-500 p-2">
                    {message}
                </div>
            )}
        </>
    );
};

export default FormGeneralError;
