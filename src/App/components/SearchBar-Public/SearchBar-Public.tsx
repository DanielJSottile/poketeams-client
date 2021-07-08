import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './SearchBar-Public.module.scss';

const SearchBarPublic: React.FC = () => {
  const { handleSearch, validateSearch, search, sort, setSearch, setSort } =
    useContext(GeneralContext);

  return (
    <div className={styles['searchbar']}>
      <form className={styles['search']}>
        <div className={styles['search']}>
          <Input
            inputHasError
            isError={!!search.value}
            validationCallback={validateSearch}
            inputClass={styles['s-input']}
            label={'Search: '}
            labelIcon={<i className="fas fa-search"></i>}
            placeholder="e.g. Pikachu"
            value={search.value}
            onChangeCallback={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
          />
          <label htmlFor="sort">
            Sort By:<i className="fas fa-sort"></i>{' '}
          </label>
          <select
            name="sort"
            id="sort"
            value={sort.value}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A - Z</option>
            <option value="rev alphabetical">Z - A</option>
          </select>
          <Button
            type="submit"
            onClickCallback={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              handleSearch(e);
            }}
          >
            Go <i className="fas fa-exclamation"></i>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarPublic;
