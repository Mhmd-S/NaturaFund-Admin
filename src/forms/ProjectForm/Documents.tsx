import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FileUploadField from '@forms/FormComponents/FormMultiFileUpload';
import FormWrapper from '@forms/FormComponents/FormWrapper';
import FormButton from '@forms/FormComponents/FormButton';

import * as projectApi from '@api/project';

const Documents = ({ project, setProject }) => {
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    setUpdateError(null);

    // Create a FormData object
    const formDataToSend = new FormData();

    for (let i = 0; i < formData.documents.length; i++) {
      formDataToSend.append('documents', formData.documents[i]);
    }

    try {
      const response = await projectApi.updateProject(project._id, formDataToSend);

      const { status, data } = response;

      if (status === 'success') {
        setProject(data);
        setIsSuccess(true);
      } else {
        setUpdateError('An error occurred, please try again.');
      }
    } catch (error) {
      setUpdateError('An error occurred, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper loading={loading} onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && (
        <div className="bg-green-200 border-green-400 border-l-4 p-4 mb-4">
          <p className="text-green-700">Updated Project Successfully!</p>
        </div>
      )}
      {updateError && (
        <div className="bg-red-200 border-red-400 border-l-4 p-4 mb-4">
          <p className="text-red-700">{updateError}</p>
        </div>
      )}
      <FileUploadField
        name="documents"
        label="Documents"
        inputGuidelines="Only PDF files are allowed"
        accept="application/pdf"
        acceptSize={200000}
        register={register}
        errors={errors}
        validationRules={{
          required: 'Legal documents are required',
        }}
        defaultFiles={project.documents}
      />
      <FormButton text="Save" type="submit" />
    </FormWrapper>
  );
};

export default Documents;
