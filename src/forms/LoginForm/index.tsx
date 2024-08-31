import FormField from '@/forms/FormComponents/FormField';
import FormButton from '@/forms/FormComponents/FormButton';
import FormWrapper from '@/forms/FormComponents/FormWrapper';
import useLoginForm from '@/forms/LoginForm/useLoginForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ setLoginType }) => {
  const { register, handleSubmit, onSubmit, loading, errors } = useLoginForm();

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="email"
        type="email"
        label="Email Address"
        register={register}
        errors={errors}
        placeholder="ex. JohnDoe@gmail.com"
        validationRules={{
          required: 'Email is required',
          isEmail: 'Invalid email',
        }}
      />

      <FormField
        name="password"
        type="password"
        label="Password"
        register={register}
        placeholder="********"
        errors={errors}
        validationRules={{
          required: 'Password is required',
        }}
      />

      <FormButton text="Log In" loading={loading} disable={Object.keys(errors).length !== 0} />
    </FormWrapper>
  );
};

export default LoginForm;
