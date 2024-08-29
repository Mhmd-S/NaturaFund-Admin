import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import LoginForm from '@/forms/LoginForm';

const Login = () => {
  return (
    <div className="w-full h-screen py-4 flex flex-col items-center gap-y-16 md:grid md:grid-cols-[40%_60%] md:grid-rows-1 md:py-0">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="h-full w-full object-cover"
      />
      <div className="w-full p-12 flex flex-col items-center gap-y-8 md:h-full">
        <div className="w-full flex items-center gap-4">
          <FontAwesomeIcon icon={faLeaf} className="text-brand-900 text-3xl" />
          <span className="text-2xl font-semibold text-brand-900">NaturaFund</span>
        </div>
        <h2 className="w-full text-lg text-brand-900 md:text-2xl">
          Welcome to NaturaFund Admin Page!
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
