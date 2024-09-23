import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
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
  const [success, setSuccess] = useState(false);
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
        setKyc(kycResponse);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Goes back one step in the history stack
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      // Update KYC status
      const kycResponse = await kycApi.updateKyc({
        _id: kyc._id,
        status: data.verified,
      });

      // Update user status
      const userResponse = await userApi.updateUser({
        _id: user._id,
        verified: data.verified,
      });
      setUser(userResponse.data);
      setKyc(kycResponse);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const userItems = () => {
    const {
      password,
      selfieId,
      frontId,
      backId,
      createdAt,
      updatedAt,
      addressProof,
      __v,
      verified,
      ...rest
    } = user;
    return rest;
  };

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className="min-h-screen p-4 grid grid-cols-2 gap-3 bg-white rounded-3xl">
        {success && (
          <div className="col-span-2 h-fit bg-green-200 border-green-400 border-l-4 p-4 mb-4">
            <p className="text-green-700">Updated Successfully!</p>
          </div>
        )}
        {loading ? (
          <LoadingIcon />
        ) : error ? (
          <div className="bg-red-200 border-red-400 border-l-4 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <>
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
                Submitted:{' '}
                <strong>{kyc.createdAt && new Date(kyc.createdAt).toLocaleDateString()}</strong>
              </span>
              <span className="text-gray-600 text-sm font-normal">
                Accuracy: <strong>{kyc.photoAccuracy}%</strong>
              </span>
            </h2>

            <FormWrapper loading={false} onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-[50%_20%] justify-center gap-4 pt-5">
                <FormSelect
                  errors={errors}
                  label="Status"
                  name="verified"
                  labelShow={false}
                  options={['rejected', 'verified', 'pending']}
                  defaultValue={user.verified}
                  register={register}
                  validationRules={{
                    require: 'Status is required',
                  }}
                />
                <FormButton text="Save" type="submit" disable={!isDirty || !isValid} />
              </div>
            </FormWrapper>

            <div className="col-span-2">
              <h2 className="text-3xl py-4 font-semibold">User Info</h2>
              <DetailsTable items={userItems()} />
            </div>

            {user.userType == 'corporation' && (
              <div className="col-span-2">
                <h2 className="text-3xl py-4 font-semibold">User Info</h2>
                <DetailsTable items={user.representative} />
              </div>
            )}

            <div>
              <h2 className="text-3xl py-4 font-semibold">Selfie Image</h2>
              <img src={user.selfieId} alt="Selfie Image" className="object-cover object-center" />
            </div>

            <div>
              <h2 className="text-3xl py-4 font-semibold">Document Image</h2>
              <img src={user.frontId} alt="Document Image" className="object-cover object-center" />
            </div>
            <div>
              <h2 className="text-3xl py-4 font-semibold">Address</h2>
              <img
                src={user.addressProof}
                alt="Document Image"
                className="object-cover object-center"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KycDetails;
