import { useState, useRef } from 'react';

interface ClipboardReturn {
  copySuccess: boolean;
  textArea: React.RefObject<HTMLTextAreaElement>;
  setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>;
  copyCodeToClipboard: () => void;
}

const useClipboard = (): ClipboardReturn => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const copyCodeToClipboard = () => {
    if (textArea.current) {
      textArea.current.select();
      const text = textArea.current.defaultValue;
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
    }
  };

  return {
    copySuccess,
    textArea,
    setCopySuccess,
    copyCodeToClipboard,
  };
};

export default useClipboard;
