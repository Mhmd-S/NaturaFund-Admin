import { FormButtonProps } from '@/types/FormComponentsTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormButton = ({ onClick, text, loading, disable, type, icon }: FormButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-fit text-sm py-3 px-3 mb-4 border-[1px] transition-all border-brand-800 bg-brand-800 text-white rounded-lg hover:bg-white hover:text-brand-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse`}
      disabled={loading || disable}
    >
      {loading ? (
        'Processing'
      ) : (
        <>
          {icon && <FontAwesomeIcon className="pr-2" icon={icon} />}
          <label>{text}</label>
        </>
      )}
    </button>
  );
};

export default FormButton;
