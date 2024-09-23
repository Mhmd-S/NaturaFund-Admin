import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormWrapper, FormSelect, FormButton } from '@forms/FormComponents';
import DetailsTable from '@components/common/DetailsTable';
import LoadingIcon from '@components/common/LoadingIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as userApi from '@api/user';
import * as kycApi from '@api/kyc';

const KycDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userResponse = await userApi.getUser(id);
        setUser(userResponse.data);

        const kycResponse = await kycApi.getKycDetails(id);
        setKyc(kycResponse.data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Goes back one step in the history stack
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className="p-4 grid grid-cols-2 gap-3 bg-white rounded-3xl">
        <h2 className="text-3xl py-4 font-bold sm:text-4xl flex flex-col space-y-1">
          <span className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="size-5 cursor-pointer"
              onClick={handleGoBack}
            />
            KYC Verification
          </span>
          <span className="text-gray-600 text-sm font-normal">
            Submitted: <strong>{user.date_submitted}</strong>
          </span>
          <span className="text-gray-600 text-sm font-normal">
            Accuracy: <strong>{kyc.accuracy_rate}%</strong>
          </span>
        </h2>

        <FormWrapper loading={false} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-[50%_20%] justify-center gap-4 pt-5">
            <FormSelect
              errors={errors}
              label="Status"
              name="status"
              labelShow={false}
              options={['Reject', 'Approve', 'Pending']}
              defaultValue={user.status}
              register={register}
              validationRules={{
                require: 'Status is required',
              }}
            />
            <FormButton text="Save" type="submit" disable={!isDirty || !isValid} />
          </div>
        </FormWrapper>

        <div>
          <h2 className="text-3xl py-4 font-semibold">User Info</h2>
          <DetailsTable items={} />
        </div>

        <div>
          <h2 className="text-3xl py-4 font-semibold">Selfie Image</h2>
          <img
            src={user.document.selfie_image}
            alt="Selfie Image"
            className="object-cover object-center"
          />
        </div>

        <div>
          <h2 className="text-3xl py-4 font-semibold">Document Image</h2>
          <img
            src={user.document.document_image}
            alt="Document Image"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default KycDetails;