import codeMessage from './codeMessage';
import { toast } from 'react-toastify';

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { status, data } = response;
  if ((data && status === 200) || status === 201) {
    const message = response.data && data.message;
    const successText = message || codeMessage[response.status];

    if (options.notifyOnSuccess) {
      toast.success(successText);
    }
  } else {
    const message = response.data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    if (options.notifyOnFailed) {
      toast.error({
        message: `Request error ${status}`,
        description: errorText,
      });
    }
  }
};

export default successHandler;
