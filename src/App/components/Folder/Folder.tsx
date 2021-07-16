import React, { useContext, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import GeneralContext from '../../contexts/GeneralContext';

type FolderProps = {
  /** id for folder*/
  id?: number;
  /** name for folder */
  folder_name?: string | undefined;
};

const Folder: FunctionComponent<FolderProps> = ({
  id = '',
  folder_name = '',
}) => {
  const { setCurrentClickedFolder } = useContext(GeneralContext);

  return (
    <Button
      buttonClass="btn"
      id={id.toString()}
      onClickCallback={() =>
        setCurrentClickedFolder({
          value: folder_name,
          id: id.toString(),
          touched: true,
        })
      }
    >
      <FontAwesomeIcon icon={faFolder} /> {folder_name}
    </Button>
  );
};

export default Folder;
