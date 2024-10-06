import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FileUploadField from '@forms/FormComponents/FormMultiFileUpload';
import FormWrapper from '@forms/FormComponents/FormWrapper';
import FormButton from '@forms/FormComponents/FormButton';

import * as projectApi from '@api/project';
 import { toast } from 'react-toastify';

const Documents = ({ project, setProject }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);

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
        toast.success('Documents updated successfully');
      } else {
        toast.error('An error occurred, please try again.');
      }
    } catch (error) {
      toast.error('An error occurred, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper loading={loading} onSubmit={handleSubmit(onSubmit)}>
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
