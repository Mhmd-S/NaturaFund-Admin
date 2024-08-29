import React from "react";
import LoadingIcon from "@/components/common/LoadingIcon";

const FormWrapper = ({ children, onSubmit, loading }) => {
    return (
        <>
            {loading ? (
                <div className="w-full h-full flex flex-col items-center justify-evenly">
                    <LoadingIcon />
                </div>
            ) : (
                <form
                    onSubmit={onSubmit}
                    className="w-full h-full flex flex-col items-center"
                >
                    {children}
                </form>
            )}
        </>
    );
};

export default FormWrapper;
