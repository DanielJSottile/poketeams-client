import React, { useContext } from 'react';
import Button from '../Button/Button';
import GeneralContext from '../../contexts/GeneralContext';

type Props = {
  /** id for folder*/
  id?: number;
  /** name for folder */
  folder_name?: string | undefined;
};

const Folder: React.FC<Props> = ({ id = '', folder_name = '' }) => {
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
