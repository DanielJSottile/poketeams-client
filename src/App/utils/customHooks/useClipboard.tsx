import { useRef } from 'react';
import toast from 'react-hot-toast';

interface ClipboardReturn {
  copySuccess: () => string;
  textArea: React.RefObject<HTMLTextAreaElement>;
  copyCodeToClipboard: () => void;
}

const useClipboard = (): ClipboardReturn => {
  const copySuccess = () => toast.success('Copied to Clipboard!!');
  const textArea = useRef<HTMLTextAreaElement>(null);

  const copyCodeToClipboard = () => {
    if (textArea.current) {
      textArea.current.select();
      const text = textArea.current.defaultValue;
      navigator.clipboard.writeText(text);
    }
  };

  return {
    copySuccess,
    textArea,
    copyCodeToClipboard,
  };
};

export default useClipboard;
