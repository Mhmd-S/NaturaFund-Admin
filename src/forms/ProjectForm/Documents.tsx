import { useForm } from 'react-hook-form';
import FileUploadField from '@/forms/FormComponents/FormMultiFileUpload';
import FormWrapper from '@/forms/FormComponents/FormWrapper';
import FormButton from '../FormComponents/FormButton';

const LEGAL = {
  'certificate_of_incorporation.pdf': '1.9 mb',
  'tax_clearance_certificate.pdf': '1.9 mb',
  'cac_form_1.pdf': '1.9 mb',
  'cac_form_2.pdf': '1.9 mb',
  'cac_form_7.pdf': '1.9 mb',
  'cac_form_10.pdf': '1.9 mb',
  'cac_form_2_7.pdf': '1.9 mb',
  'cac_form_2_10.pdf': '1.9 mb',
  'cac_form_2_1.pdf': '1.9 mb',
  'cac_form_2_4.pdf': '1.9 mb',
  'cac_form_2_5.pdf': '1.9 mb',
  'cac_form_2_3.pdf': '1.9 mb',
  'cac_form_2_2.pdf': '1.9 mb',
  'cac_form_2_6.pdf': '1.9 mb',
  'cac_form_2_8.pdf': '1.9 mb',
  'cac_form_2_9.pdf': '1.9 mb',
};

const Documents = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <FormWrapper loading={false} onSubmit={handleSubmit((data) => console.log(data))}>
        <FileUploadField
          name="legal"
          label="Legal Documents"
          inputGuidelines="Only PDF files are allowed"
          accept="application/pdf"
          acceptSize={200000}
          register={register}
          errors={errors}
          validationRules={{
            required: 'Legal documents are required',
          }}
          defaultFiles={[
            'https://picsum.photos/200/300',
            'https://picsum.photos/200/300',
            'https://picsum.photos/200/300',
            'https://picsum.photos/200/300',
            'https://picsum.photos/200/300',
            'https://picsum.photos/200/300',
          ]}
        />
        <FormButton text="Save" type="submit" />
    </FormWrapper>
  );
};

export default Documents;
