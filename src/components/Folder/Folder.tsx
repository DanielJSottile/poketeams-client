import React, { useContext } from 'react';
import Button from '../Button/Button';
import GeneralContext from '../../contexts/GeneralContext';

// Component

const Folder = (props: any) => {
  // Set Context

  const GenCon = useContext(GeneralContext);
  const { handleCurrentFolderClicked } = GenCon;

  // Final Render

  return (
    <Button
      buttonClass="btn"
      id={props.id}
      onClickCallback={() =>
        handleCurrentFolderClicked(props.folder_name, props.id)
      }
    >
      <i className="fas fa-folder"></i> {props.folder_name}
    </Button>
  );
};

export default Folder;
