import React, { useContext, FunctionComponent } from 'react';
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
      <i className="fas fa-folder"></i> {folder_name}
    </Button>
  );
};

export default Folder;
