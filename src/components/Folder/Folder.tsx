import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

// Component

const Folder = (props: any) => {

  // Set Context

  const GenCon = useContext(GeneralContext);
  const { handleCurrentFolderClicked } = GenCon;

  // Final Render

  return (
    <button
      className="btn"
      id={props.id}
      onClick={() => handleCurrentFolderClicked(props.folder_name, props.id)}
    >
      <i className="fas fa-folder"></i> {props.folder_name}
    </button>
  );
};

export default Folder;
