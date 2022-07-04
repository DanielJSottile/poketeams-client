import React, { FunctionComponent } from 'react';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';

type DeleteExpandProps = {
  message: string;
  yesCallback: () => void;
  noCallback: () => void;
};

const DeleteExpand: FunctionComponent<DeleteExpandProps> = ({
  message,
  yesCallback,
  noCallback,
}) => {
  return (
    <div>
      <p>{message}</p>
      <Button onClickCallback={yesCallback}>
        Yes <FontAwesomeIcon icon={faThumbsUp} />
      </Button>
      <Button onClickCallback={noCallback}>
        No <FontAwesomeIcon icon={faThumbsDown} />
      </Button>
    </div>
  );
};

export default DeleteExpand;
