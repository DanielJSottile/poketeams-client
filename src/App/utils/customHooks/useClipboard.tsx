import { useState, useRef } from 'react';

const useClipboard = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const copyCodeToClipboard = () => {
    textArea.current!.select();
    const text = textArea.current!.defaultValue;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
  };

  return {
    copySuccess,
    textArea,
    setCopySuccess,
    copyCodeToClipboard,
  };
};

export default useClipboard;
