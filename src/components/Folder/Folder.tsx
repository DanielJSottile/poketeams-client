import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

const Folder = (props: any) => {
  const GenCon = useContext(GeneralContext);
  const { handleCurrentFolderClicked } = GenCon;

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
