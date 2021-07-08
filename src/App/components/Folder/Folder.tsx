import React, { useContext } from 'react';
import Button from '../Button/Button';
import GeneralContext from '../../contexts/GeneralContext';

type Props = {
  /** id for folder*/
  id?: string;
  /** name for folder */
  folder_name?: string | undefined;
};

const Folder: React.FC<Props> = ({ id = '', folder_name = '' }) => {
  const { handleCurrentFolderClicked } = useContext(GeneralContext);

  return (
    <Button
      buttonClass="btn"
      id={id}
      onClickCallback={() => handleCurrentFolderClicked(folder_name, id)}
    >
      <i className="fas fa-folder"></i> {folder_name}
    </Button>
  );
};

export default Folder;
