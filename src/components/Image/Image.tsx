import React from 'react';

type Props = {
  /** class for input container */
  containerClass?: string;
  /** class for the image */
  imageClass?: string;
  /** src for image*/
  src: string;
  /** alt label for image */
  alt: string;
};

const Image: React.FC<Props> = ({
  containerClass = '',
  imageClass = '',
  src,
  alt,
}) => {
  return (
    <div className={containerClass}>
      <img className={imageClass} src={src} alt={alt} />
    </div>
  );
};

export default Image;
