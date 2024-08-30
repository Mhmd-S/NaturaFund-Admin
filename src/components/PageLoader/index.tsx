import React from "react";
import LoadingIcon from "@/components/common/LoadingIcon";

const PageLoader = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <LoadingIcon />
        </div>
    );
};

export default PageLoader;
