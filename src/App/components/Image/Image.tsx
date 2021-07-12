import React, { FunctionComponent } from 'react';

type ImageProps = {
  /** class for input container */
  containerClass?: string;
  /** class for the image */
  imageClass?: string;
  /** src for image*/
  src: string;
  /** alt label for image */
  alt: string;
};

const Image: FunctionComponent<ImageProps> = ({
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
