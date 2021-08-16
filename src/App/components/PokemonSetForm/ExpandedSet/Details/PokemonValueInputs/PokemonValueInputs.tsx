import React, { FunctionComponent, ChangeEvent } from 'react';
import Input from '../../../../Input';
import styles from './PokemonValueInputs.module.scss';

interface PokemonValue {
  isEffortValue: boolean;
  label: string;
  onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
  name: string;
  id: string;
}

type PokemonValueInputsProps = {
  valueArray: PokemonValue[];
  isPublic: boolean;
};

const PokemonValueInputs: FunctionComponent<PokemonValueInputsProps> = ({
  valueArray,
  isPublic,
}) => {
  const renderInputs = () =>
    valueArray.map((value) => (
      <Input
        key={`${new Date().getTime()}-${value.id}`}
        containerClass={styles['stat']}
        inputHasError={false}
        htmlFor={value.name}
        label={value.label}
        inputClass={styles['pokemon-value']}
        onChangeCallback={value.onChangeCallback}
        placeholder={`${value.isEffortValue ? '0' : '31'}`}
        value={value.value}
        type="number"
        name={value.name}
        min="0"
        max={`${value.isEffortValue ? '252' : '31'}`}
        id={value.id}
        disabled={isPublic}
        readOnly={isPublic}
      />
    ));
  return <>{renderInputs()}</>;
};

export default PokemonValueInputs;
