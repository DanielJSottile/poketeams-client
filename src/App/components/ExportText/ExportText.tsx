import React, { FunctionComponent } from 'react';
import {
  faDownload,
  faClipboard,
  faShareSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { PokemonFolder, PokemonTeam, PokemonSet } from '../../@types';
import { useClipboard } from '../../utils/customHooks';
import Button from '../Button';
import Input from '../Input';
import TextArea from '../TextArea';
import styles from './ExportText.module.scss';

interface LinkState {
  folders?: PokemonFolder[];
  teams?: PokemonTeam[];
  sets?: PokemonSet[];
  input?: { [x: string]: PokemonSet[] }[];
  singleSet?: PokemonSet;
  singleteam?: PokemonTeam;
}

type ExportTextProps = {
  exportText: string;
  shareText: string;
  linkPathname: string;
  linkState: LinkState;
  inputValue: string;
  textAreaId: string;
  textAreaValue: string;
};

const ExportText: FunctionComponent<ExportTextProps> = ({
  exportText,
  shareText,
  linkPathname,
  linkState,
  inputValue,
  textAreaId,
  textAreaValue,
}) => {
  const { copySuccess, textArea, copyCodeToClipboard } = useClipboard();
  return (
    <div className={styles['export-text']}>
      <div>
        <div className={styles['buttons']}>
          <div className={styles['upper-buttons']}>
            <label htmlFor='export-text' className={styles['label']}>
              {exportText} <FontAwesomeIcon icon={faDownload} />
            </label>
            <Button
              onClickCallback={() => {
                copyCodeToClipboard();
                copySuccess();
              }}
              buttonClass={styles['copy-text-button']}
            >
              Copy Text <FontAwesomeIcon icon={faClipboard} />
            </Button>
          </div>
          <div className={styles['inner-buttons']}>
            <Link
              className={styles['share-link']}
              to={{
                pathname: linkPathname,
                state: linkState,
              }}
              target='_blank'
            >
              {shareText} <FontAwesomeIcon icon={faShareSquare} />
            </Link>

            <Input
              id='share-input'
              inputHasError={false}
              inputClass={styles['share-input']}
              disabled
              type='text'
              readOnly
              value={inputValue}
            />
          </div>
        </div>
      </div>

      <TextArea
        textAreaHasError={false}
        ref={textArea}
        disabled
        readOnly
        name='export-text'
        id={textAreaId}
        value={textAreaValue}
      />
    </div>
  );
};

export default ExportText;
