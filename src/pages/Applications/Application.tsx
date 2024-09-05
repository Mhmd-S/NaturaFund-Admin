import { useForm } from 'react-hook-form';

import { FormWrapper, FormSelect, FormButton } from '@/forms/FormComponents';
import DetailsTable from '@/components/common/DetailsTable';
import MediaTable from '@/components/common/MediaTable';

const DUMMYAPPLICATION = {
  project: {
    name: 'AI Development Project',
    owner: {
      name: 'Tech Innovators Inc.',
      description: 'A leading company in AI and machine learning solutions.',
    },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ab ipsam libero, dolorum in sunt asperiores recusandae ipsum incidunt debitis adipisci placeat odit. Quod tenetur officia natus id iusto fugiat.',
    status: 'In Progress',
    submission_date: '2023-12-01',
    address: '123 Innovation Drive',
    country: 'USA',
    city: 'San Francisco',
  },
  status: 'In Progress',
  documents: ['Project Proposal', 'Technical Specifications', 'Budget Report', 'Timeline', '123', '123', '123'],
  submission_date: '2023-11-15',
};

const Application = () => {
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className=" p-4 grid grid-cols-2 gap-3 bg-white rounded-3xl">
        <h2 className="text-3xl py-4 font-bold sm:text-4xl flex flex-col">
          <span>{DUMMYAPPLICATION.project.name}</span>
          <span className=" text-gray-600 text-sm font-normal">
            By: <strong>{DUMMYAPPLICATION.project.owner.name}</strong>
          </span>
        </h2>

        <FormWrapper loading={false} onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-[50%_20%] gap-4 pt-5'>
            <FormSelect
              errors={errors}
              label="Status"
              name="status"
              labelShow={false}
              options={['Awaiting Action', 'In Progress', 'Completed', 'On Hold']}
              defaultValue={DUMMYAPPLICATION.project.status}
              register={register}
              validationRules={{
                require: 'Status is required',
              }}
            />
            <FormButton text="Save" type="submit" disable={!isDirty || !isValid} />
          </div>
        </FormWrapper>

        <div>
          <h2 className="text-3xl py-4 font-semibold">Description</h2>
          <p>{DUMMYAPPLICATION.project.description}</p>
        </div>

        <div>
          <h2 className="text-3xl py-4 font-semibold">Description</h2>
          <DetailsTable items={getTableData()} />
        </div>

        {/* Project Description */}
        <div>
          <h2 className="text-3xl py-4 font-semibold">Project Description</h2>
          <article className="space-y-4 text-gray-600">
            <p>{DUMMYAPPLICATION.project.description}</p>
          </article>
        </div>

        <div>
          <h2 className="text-3xl py-4 font-semibold">Supporting Documents</h2>
          <MediaTable items={DUMMYAPPLICATION.documents} />
        </div>
      </div>
    </div>
  );
};

export default Application;
