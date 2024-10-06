import { set, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { FormWrapper, FormSelect, FormButton } from '@forms/FormComponents';

import LoadingIcon from '@components/common/LoadingIcon';
import DetailsTable from '@components/common/DetailsTable';
import MediaTable from '@components/common/MediaTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { getApplication, updateApplication, acceptApplication } from '@api/application';

const Application = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await getApplication(id);
        setApplication(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('An error occurred, please try again.');
        setLoading(false);
      }
    };
    fetchApplication();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Goes back one step in the history stack
  };

  const onSubmit = async (formData) => {
    // Check what type os status is being updated. If it is 'Completed', then call the acceptApplication function
    setLoading(true);
    try {
      let response;
      if (formData.status === 'approved') {
        response = await acceptApplication(id);
      } else {
        response = await updateApplication(id, formData);
      }

      const { status, data } = response;

      if (status === 'success') {
        setApplication(data);
        toast.success('Application updated successfully');
      }
    } catch (error) {
      toast.error('An error occurred, please try again.');
    }
    setLoading(false);
  };

  const projectLocation = {
    country: application.country,
    address: application.address,
  };

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className="min-h-screen p-4 grid grid-cols-2 gap-3 bg-white rounded-3xl">
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <h2 className="text-3xl py-4 font-bold sm:text-4xl flex flex-col space-y-1">
              <span className="flex items-center gap-4">
                {' '}
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="size-5 cursor-pointer"
                  onClick={handleGoBack}
                />
                {application.name}
              </span>
              <span className=" text-gray-600 text-sm font-normal">
                Submitted: <strong>{application.createdAt}</strong>
              </span>
            </h2>

            <FormWrapper loading={loading} onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-[50%_20%] gap-4 pt-5 justify-center">
                <FormSelect
                  errors={errors}
                  label="Status"
                  name="status"
                  labelShow={false}
                  options={['pending', 'approved', 'rejected']}
                  defaultValue={application.status}
                  register={register}
                  validationRules={{
                    require: 'Status is required',
                  }}
                />
                <FormButton text="Save" type="submit" disable={!isDirty || !isValid} />
              </div>
            </FormWrapper>

            <div className="col-span-2">
              <h2 className="text-3xl py-4 font-semibold">Project Description</h2>
              <p>{application.description}</p>
            </div>

            <div>
              <h2 className="text-3xl py-4 font-semibold">Project Location</h2>
              <DetailsTable items={projectLocation} />
            </div>

            <div>
              <h2 className="text-3xl py-4 font-semibold">Supporting Documents</h2>
              <MediaTable items={application.documents} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Application;
