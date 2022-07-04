import React, { useContext, FunctionComponent } from 'react';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import GeneralContext from '../../contexts/GeneralContext';
import Button from '../Button';
import styles from './Folder.module.scss';

type FolderProps = {
  /** id for folder*/
  id: number;
  /** name for folder */
  folder_name: string | undefined;
};

const Folder: FunctionComponent<FolderProps> = ({
  id = '',
  folder_name = '',
}) => {
  const { setCurrentClickedFolder, currentClickedFolder } =
    useContext(GeneralContext);

  return (
    <Button
      buttonClass={classnames(styles['button-styling'], {
        [styles['active']]: currentClickedFolder.id === id.toString(),
      })}
      id={id.toString()}
      onClickCallback={() =>
        setCurrentClickedFolder({
          value: folder_name,
          id: id.toString(),
          touched: true,
        })
      }
    >
      <FontAwesomeIcon icon={faFolder} size='6x' />
      <span className={styles['font']}>{folder_name}</span>
    </Button>
  );
};

export default Folder;
