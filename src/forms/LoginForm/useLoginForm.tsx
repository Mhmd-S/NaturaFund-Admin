import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const { authContextAction, state } = useAuthContext();

    const { login } = authContextAction;

    const { current: user, isLoading, error } = state;

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await login(data);
    };

    return {
        user,
        register,
        handleSubmit,
        onSubmit,
        isLoading,
        authError: error,
        errors,
    };
};

export default useLogin;
