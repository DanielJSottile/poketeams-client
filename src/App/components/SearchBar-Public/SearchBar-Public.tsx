import React, { useContext, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSort,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import GeneralContext from '../../contexts/GeneralContext';
import Input from '../Input';
import Button from '../Button';
import { validateSearch } from '../../utils/validations';
import styles from './SearchBar-Public.module.scss';

const SearchBarPublic: FunctionComponent = () => {
  const { handleSearch, search, sort, setSearch, setSort } =
    useContext(GeneralContext);

  return (
    <div className={styles['searchbar']}>
      <form className={styles['search']}>
        <div className={styles['search']}>
          <Input
            inputHasError
            isError={!!search.value}
            validationCallback={() => validateSearch(search)}
            inputClass={styles['s-input']}
            label={'Search: '}
            labelIcon={<FontAwesomeIcon icon={faSearch} />}
            placeholder="e.g. Pikachu"
            value={search.value}
            onChangeCallback={(e) =>
              setSearch({ value: e.target.value, touched: true })
            }
            type="text"
            name="search"
            id="search"
          />
          <label htmlFor="sort">
            Sort By:
            <FontAwesomeIcon icon={faSort} />{' '}
          </label>
          <select
            name="sort"
            id="sort"
            value={sort.value}
            onChange={(e) => setSort({ value: e.target.value, touched: true })}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A - Z</option>
            <option value="rev alphabetical">Z - A</option>
          </select>
          <Button
            type="submit"
            onClickCallback={(e) => {
              handleSearch(e);
            }}
          >
            Go <FontAwesomeIcon icon={faExclamation} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarPublic;
