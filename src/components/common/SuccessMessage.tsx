
type SuccessMessageProps = {
  message: string;
};

const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return (
      <div className="bg-green-200 border-green-400 border-l-4 p-4 mb-4">
          <p className="text-green-700">{message}!</p>
      </div>
  );
};

export default SuccessMessage;
