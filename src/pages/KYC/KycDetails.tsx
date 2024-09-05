import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { FormWrapper, FormSelect, FormButton } from '@/forms/FormComponents';
import DetailsTable from '@/components/common/DetailsTable';
import MediaTable from '@/components/common/MediaTable';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const DUMMYAPPLICATION = {
  id: 1,
  identity: {
    name: 'John Smith',
    dob: '31/12/2001',
    expiration: '21/12/2024',
    number: '018295744',
  },
  date_submitted: '21/12/2001',
  status: 'Action Required',
  type: 'company',
  selfie_image: 'https://picsum.photos/200/300',
  document: {
    extracted_info: {
      name: 'John Smith',
      dob: '31/12/2001',
      expiration: '21/12/2024',
      number: '018295744',
    },
    document_image: 'https://picsum.photos/200/300',
  },
  result: 'Verified Successfully 99.8%',
};

const KycDetails = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm();

  const getTableData = () => {
    const companyDetails = DUMMYAPPLICATION.project;
    const { name, owner, description, ...rest } = companyDetails;
    return rest;
  };

  const handleGoBack = () => {
    navigate(-1); // Goes back one step in the history stack
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className=" p-4 grid grid-cols-2 gap-3 bg-white rounded-3xl">
        <h2 className="text-3xl py-4 font-bold sm:text-4xl flex flex-col space-y-1">
          <span className="flex items-center gap-4">
            {' '}
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="size-5 cursor-pointer"
              onClick={handleGoBack}
            />
            KYC Verification
          </span>
          <span className=" text-gray-600 text-sm font-normal">
            Submitted: <strong>{DUMMYAPPLICATION.date_submitted}</strong>
          </span>
          <span className=" text-gray-600 text-sm font-normal">
            Accuracy: <strong>99.8%</strong>
          </span>
        </h2>

        <FormWrapper loading={false} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-[50%_20%] justify-center gap-4 pt-5">
            <FormSelect
              errors={errors}
              label="Status"
              name="status"
              labelShow={false}
              options={['Awaiting Action', 'In Progress', 'Completed']}
              defaultValue={DUMMYAPPLICATION.status}
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
          <DetailsTable items={DUMMYAPPLICATION.identity} />
        </div>

        <div>
          <h2 className="text-3xl py-4 font-semibold">Extracted Info</h2>
          <DetailsTable items={DUMMYAPPLICATION.document.extracted_info} />
        </div>

        <div>
          <h2 className="text-3xl py-4 font-semibold">Selfie Image</h2>
          <img
            src={DUMMYAPPLICATION.document.document_image}
            alt="Selfie Image"
            className="object-cover object-center"
          />
        </div>

        <div>
          <h2 className="text-3xl py-4 font-semibold">Document Image</h2>
          <img
            src={DUMMYAPPLICATION.document.document_image}
            alt="Selfie Image"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default KycDetails;
