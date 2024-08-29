import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const { authContextAction, state } = useAuthContext();

    const { current: user, isLoggedIn, isLoading, isSuccess } = state;

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/app/home");
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await loginUser(data.email, data.password);
    };

    const loginUser = async (email, password) => {
        // await login(email, password);
        // await getUserInfo();
    };

    return {
        user,
        register,
        handleSubmit,
        onSubmit,
        isLoading,
        authError: null,
        errors,
    };
};

export default useLogin;
