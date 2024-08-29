import React from "react";

const FormButton = ({ onClick, text, loading, disable }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full h-fit text-md py-3 px-3 border-2 transition-all border-brand-800 bg-brand-800 text-white rounded-lg hover:bg-white hover:text-brand-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse`}
            disabled={loading || disable}
        >
            {loading ? "Processing" : text}
        </button>
    );
};

export default FormButton;
