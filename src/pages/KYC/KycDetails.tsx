import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormWrapper, FormSelect, FormButton, FormField } from '@forms/FormComponents';
import FormFieldTextArea from '@forms/FormComponents/FormTextArea';

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm();

  const reasonField = watch('verified', 'rejected');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userResponse = await userApi.getUser(id);
        setUser(userResponse.data);

        const kycResponse = await kycApi.getKycDetails(id);
        setKyc(kycResponse);

        setLoading(false);
      } catch (error) {
        toast.error('An error occurred, please try again.');
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

      // Update KYC status
      const kycResponse = await kycApi.updateKyc({
        _id: kyc._id,
        status: data.verified,
        reason: data.reason,
      });

      // Update user status
      const userResponse = await userApi.updateUser({
        _id: user._id,
        verified: data.verified,
      });

      setUser(userResponse.data);
      setKyc(kycResponse);
      setLoading(false);
      toast.success('KYC updated successfully');
    } catch (err) {
      toast.error('An error occurred, please try again.');
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
      representative,
      bankAccount,
      suspended,
      __v,
      verified,
      ...rest
    } = user;
    return rest;
  };

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className="min-h-screen p-4 grid grid-cols-2 gap-6 bg-white rounded-3xl">
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <h2 className="col-span-2 text-3xl py-4 font-bold sm:text-4xl flex flex-col space-y-1">
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
            </h2>

            <div className="col-span-2">
              <h2 className="text-3xl py-4 font-semibold">User Info</h2>
              <DetailsTable items={userItems()} />
            </div>

            {user.userType == 'Corporation' && (
              <div className="col-span-2">
                <h2 className="text-3xl py-4 font-semibold">Representative Info</h2>
                <DetailsTable items={JSON.parse(user.representative)} />
              </div>
            )}

            <div className="col-span-2 w-full grid grid-cols-3 grid-rows-1">

              <h2 className="text-3xl py-4 font-semibold col-span-3">KYC Images</h2>

              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl py-4">Selfie Image</h2>
                <img
                  src={user.selfieId}
                  alt="Selfie Image"
                  className="object-cover object-center"
                />
              </div>

              <h3 className="w-full text-center text-3xl place-self-center flex flex-col ">
                Accuracy:
                <span className="text-brand-700">
                  <strong>{kyc.photoAccuracy}%</strong>
                </span>
              </h3>

              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl py-4">Document Image</h2>
                <img
                  src={user.frontId}
                  alt="Document Image"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl py-4 font-semibold">Proof of Address</h2>
              <img
                src={user.addressProof}
                alt="Document Image"
                className="object-cover object-center"
              />
            </div>

            {user.userType == 'Corporation' && (
              <div>
                <h2 className="text-3xl py-4 font-semibold">
                  Business License/Incorporation Document
                </h2>
                <img src={user.businessLicense} className="object-cover object-center" />
              </div>
            )}

            <span className="w-full pt-4 col-span-2">
              <FormWrapper loading={loading} onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-3xl font-semibold">KYC Action</h2>
                <div className="w-full grid grid-cols-1 justify-center gap-4 pt-5">
                  <FormSelect
                    errors={errors}
                    label="Status"
                    name="verified"
                    options={['rejected', 'verified', 'pending']}
                    defaultValue={user.verified}
                    register={register}
                    validationRules={{
                      require: 'Status is required',
                    }}
                    labelShow
                  />
                  <span className="col-span-2">
                    {reasonField === 'rejected' && (
                      <FormFieldTextArea
                        rows={3}
                        label="Reason"
                        name="reason"
                        type="text"
                        errors={errors}
                        defaultValue={kyc.reason}
                        placeholder="Insert note here or rejection reason if rejecting."
                        register={register}
                        validationRules={{
                          required: 'Reason is required',
                        }}
                      />
                    )}
                  </span>
                  <FormButton text="Save" type="submit" disable={!isDirty || !isValid} />
                </div>
              </FormWrapper>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default KycDetails;
