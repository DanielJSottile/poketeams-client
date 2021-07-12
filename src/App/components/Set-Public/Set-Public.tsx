import React, { Fragment, useState, useRef, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Image from '../Image/Image';
import Button from '../Button/Button';
import showdownGenerate from '../../functions/generate';
import legality from '../../functions/legality';
import styles from './Set-Public.module.scss';
import { PokemonSet } from '../../@types';

export type Props = {
  /** Pokemon Set */
  set: PokemonSet;
};

const SetPublic: FunctionComponent<Props> = ({ set }): JSX.Element => {
  const [expandToggle, setExpandToggle] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSetToggle = () => {
    setExpandToggle(!expandToggle);
  };

  const removeCopySuccess = () => {
    setCopySuccess(false);
  };

  const textArea = useRef<HTMLTextAreaElement>(null);

  const copyCodeToClipboard = () => {
    textArea.current!.select();
    document.execCommand('copy'); // this seems to not work
    const text = textArea.current!.defaultValue;
    navigator.clipboard.writeText(text); // this seems to work!
    setCopySuccess(true);
  };

  const renderExpandedSet = () => {
    return (
      <div className={styles['pokemon']}>
        <Button onClickCallback={() => handleSetToggle()}>
          Compress Set <i className="fas fa-compress-arrows-alt"></i>
        </Button>
        <form>
          {' '}
          {/* CHECK: do we even need disabled and readOnly? The inputs are already disabled*/}
          <div className={styles['pokemon-intro']}>
            <div className={styles['name-sprite']}>
              <div className={styles['names']}>
                <Input
                  inputHasError={false}
                  htmlFor={'pokemon-name'}
                  label={'Species: '}
                  inputClass={styles['pokemon-name']}
                  disabled
                  readOnly
                  value={set.species || 'Pikachu'}
                  type="text"
                  name="pokemon-name"
                  id={`pokemon-name-${set.id}`}
                />

                <Input
                  inputHasError={false}
                  htmlFor={'pokemon-nickname'}
                  label={'Nickname: (optional)'}
                  inputClass={styles['pokemon-nickname']}
                  disabled
                  readOnly
                  value={set.nickname || ''}
                  type="text"
                  name="pokemon-nickname"
                  id={`pokemon-nickname-${set.id}`}
                />

                <Input
                  inputHasError={false}
                  htmlFor={'pokemon-gender'}
                  label={'Gender: '}
                  inputClass={styles['pokemon-gender']}
                  disabled
                  readOnly
                  value={set.gender || ''}
                  type="text"
                  name="pokemon-gender"
                  id={`pokemon-gender-${set.id}`}
                />

                <Input
                  containerClass={styles['label-as-column']}
                  inputHasError={false}
                  htmlFor={'shiny'}
                  label={'Shiny:'}
                  type="checkbox"
                  id="shiny-2"
                  name="shiny"
                  disabled
                  readOnly
                  checked={set.shiny || false}
                />
              </div>
              <div className={styles['sprites']}>
                <Image
                  imageClass={styles['sprite-img']}
                  src={legality.returnIconSprite(set.species, set.shiny)}
                  alt={set.species || 'Pikachu'}
                />
                <div className={styles['type-icons']}>
                  {legality
                    .returnTypeIcon(legality.returnType(set.species))
                    .map((type: string, i: number) => {
                      return (
                        <Image
                          imageClass={styles['type-img']}
                          src={`${type}`}
                          key={i}
                          alt={`${i + 1}`}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles['details']}>
            <div className={styles['first-details']}>
              <Input
                inputHasError={false}
                htmlFor={'pokemon-level'}
                label={'Level: '}
                inputClass={styles['pokemon-level']}
                disabled
                readOnly
                value={set.level || 100}
                type="text"
                name="pokemon-level"
                id={`pokemon-level-${set.id}`}
              />

              <Input
                inputHasError={false}
                htmlFor={'pokemon-item'}
                label={'Item: (optional)'}
                inputClass={styles['pokemon-item']}
                disabled
                readOnly
                value={set.item || ''}
                type="text"
                name="pokemon-item"
                id={`pokemon-item-${set.id}`}
              />
              <Input
                inputHasError={false}
                htmlFor={'pokemon-ability'}
                label={'Ability: (optional)'}
                inputClass={styles['pokemon-ability']}
                disabled
                readOnly
                value={set.ability || ''}
                type="text"
                name="pokemon-ability"
                id={`pokemon-ability-${set.id}`}
              />
              <Input
                inputHasError={false}
                htmlFor={'pokemon-nature'}
                label={'Nature: (optional)'}
                inputClass={styles['pokemon-nature']}
                disabled
                readOnly
                value={set.nature || ''}
                type="text"
                name="pokemon-nature"
                id={`pokemon-nature-${set.id}`}
              />
              <Input
                inputHasError={false}
                htmlFor={'pokemon-happiness'}
                label={'Happiness:'}
                inputClass={styles['pokemon-happiness']}
                disabled
                readOnly
                value={set.happiness || 255}
                type="number"
                name="pokemon-happiness"
                min="0"
                max="252"
                id={`pokemon-happiness-${set.id}`}
              />
            </div>
            <div className={styles['stats']}>
              <div className={styles['evs']}>
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-ev-hp'}
                  label={'HP EV:'}
                  inputClass={styles['pokemon-ev']}
                  disabled
                  readOnly
                  value={set.hp_ev || 0}
                  type="number"
                  name="pokemon-ev-hp"
                  min="0"
                  max="252"
                  id={`pokemon-ev-hp-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-ev-atk'}
                  label={'Atk EV:'}
                  inputClass={styles['pokemon-ev']}
                  disabled
                  readOnly
                  value={set.atk_ev || 0}
                  type="number"
                  name="pokemon-ev-atk"
                  min="0"
                  max="252"
                  id={`pokemon-ev-atk-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-ev-def'}
                  label={'Def EV:'}
                  inputClass={styles['pokemon-ev']}
                  disabled
                  readOnly
                  value={set.def_ev || 0}
                  type="number"
                  name="pokemon-ev-def"
                  min="0"
                  max="252"
                  id={`pokemon-ev-def-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-ev-spa'}
                  label={'SpA EV:'}
                  inputClass={styles['pokemon-ev']}
                  disabled
                  readOnly
                  value={set.spa_ev || 0}
                  type="number"
                  name="pokemon-ev-spa"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spa-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-ev-spd'}
                  label={'SpD EV:'}
                  inputClass={styles['pokemon-ev']}
                  disabled
                  readOnly
                  value={set.spd_ev || 0}
                  type="number"
                  name="pokemon-ev-spd"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spd-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-ev-spe'}
                  label={'SpE EV:'}
                  inputClass={styles['pokemon-ev']}
                  disabled
                  readOnly
                  value={set.spe_ev || 0}
                  type="number"
                  name="pokemon-ev-spe"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spe-${set.id}`}
                />
              </div>
              <div className={styles['ivs']}>
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-iv-hp'}
                  label={'HP IV:'}
                  inputClass={styles['pokemon-iv']}
                  disabled
                  readOnly
                  value={set.hp_iv || 31}
                  type="number"
                  name="pokemon-iv-hp"
                  min="0"
                  max="31"
                  id={`pokemon-iv-hp-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-iv-atk'}
                  label={'Atk IV:'}
                  inputClass={styles['pokemon-iv']}
                  disabled
                  readOnly
                  value={set.atk_iv || 31}
                  type="number"
                  name="pokemon-iv-atk"
                  min="0"
                  max="31"
                  id={`pokemon-iv-atk-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-iv-def'}
                  label={'Def IV:'}
                  inputClass={styles['pokemon-iv']}
                  disabled
                  readOnly
                  value={set.def_iv || 31}
                  type="number"
                  name="pokemon-iv-def"
                  min="0"
                  max="31"
                  id={`pokemon-iv-def-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-iv-spa'}
                  label={'SpA IV:'}
                  inputClass={styles['pokemon-iv']}
                  disabled
                  readOnly
                  value={set.spa_iv || 31}
                  type="number"
                  name="pokemon-iv-spa"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spa-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-iv-spd'}
                  label={'SpD IV:'}
                  inputClass={styles['pokemon-iv']}
                  disabled
                  readOnly
                  value={set.spd_iv || 31}
                  type="number"
                  name="pokemon-iv-spd"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spd-${set.id}`}
                />
                <Input
                  inputHasError={false}
                  containerClass={styles['stat']}
                  htmlFor={'pokemon-iv-spe'}
                  label={'SpE IV:'}
                  inputClass={styles['pokemon-iv']}
                  disabled
                  readOnly
                  value={set.spe_iv || 31}
                  type="number"
                  name="pokemon-iv-spe"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spe-${set.id}`}
                />
              </div>
            </div>
            <div className={styles['moves']}>
              <Input
                containerClass={styles['label-as-row']}
                inputHasError={false}
                htmlFor={'pokemon-moves'}
                label={'Moves:'}
                inputClass={styles['pokemon-move']}
                disabled
                readOnly
                value={set.move_one || 'Tackle'}
                type="text"
                name="pokemon-move"
                id={`pokemon-${set.id}-move-1`}
              />
              <Input
                inputHasError={false}
                inputClass={styles['pokemon-move']}
                disabled
                readOnly
                value={set.move_two || ''}
                type="text"
                name="pokemon-move"
                id={`pokemon-${set.id}-move-2`}
              />
              <Input
                inputHasError={false}
                inputClass={styles['pokemon-move']}
                disabled
                readOnly
                value={set.move_three || ''}
                type="text"
                name="pokemon-move"
                id={`pokemon-${set.id}-move-3`}
              />
              <Input
                inputHasError={false}
                inputClass={styles['pokemon-move']}
                disabled
                readOnly
                value={set.move_four || ''}
                type="text"
                name="pokemon-move"
                id={`pokemon-${set.id}-move-4`}
              />
            </div>
          </div>
        </form>

        <div className={styles['export-pokemon']}>
          {copySuccess ? (
            <div className={styles['copied']}>Copied to Clipboard!!</div>
          ) : null}
          <div>
            <Button
              onClickCallback={() => {
                copyCodeToClipboard();
                setTimeout(removeCopySuccess, 3000);
              }}
            >
              Copy Text
            </Button>
            <Link
              to={{
                pathname: `/share/${set.team_id}/${set.id}`,
                state: { singleSet: set },
              }}
              target="_blank"
            >
              Share This Set! <i className="fas fa-share-square"></i>
            </Link>
            <Input
              inputHasError={false}
              type="text"
              readOnly
              value={`poketeams.now.sh/${set.team_id}/${set.id}`}
            />
          </div>
          <TextArea
            containerClass={styles['export-pokemon']}
            textAreaHasError={false}
            htmlFor="export-pokemon"
            label={'Export Pokemon:'}
            ref={textArea}
            disabled
            readOnly
            name="export-pokemon"
            id="export-pokemon-2"
            value={showdownGenerate([set])}
          />
        </div>
      </div>
    );
  };

  const renderUnexpandedSet = () => {
    const types = legality
      .returnTypeIcon(legality.returnType(set.species))
      .map((type: string, i: number) => {
        return (
          <Image
            imageClass={styles['icon']}
            key={i}
            src={`${type}`}
            alt={`${i + 1}`}
          />
        );
      });

    return (
      <Fragment>
        <div className={styles['pokemon']}>
          <div className={styles['closed']} onClick={() => handleSetToggle()}>
            <div className={styles['inside']}>
              <Image
                imageClass={styles['icon']}
                src={legality.returnIconSprite(set.species, set.shiny)}
                alt={set.species}
              />
            </div>
            <div className={styles['inside']}>
              <span>{set.species}</span>
            </div>
            <div className={styles['inside']}>{types}</div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {expandToggle ? renderUnexpandedSet() : renderExpandedSet()}
    </Fragment>
  );
};

export default SetPublic;
