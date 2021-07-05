import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './SearchBar-Build.module.scss';

// Component

const SearchBarBuild = (props: any) => {
  // Set Context

  const GenCon = useContext(GeneralContext);

  const {
    handleFilter,
    validateFilter,
    filter,
    filtersort,
    setFilter,
    setFilterSort,
  } = GenCon;

  // Final Render

  return (
    <div className={styles['searchbar']}>
      <form className={styles['search']}>
        <div className={styles['search']}>
          <Input
            inputHasError
            isError={!!filter.value}
            validationCallback={validateFilter}
            inputClass={styles['s-input']}
            label={'Search: '}
            labelIcon={<i className="fas fa-search"></i>}
            placeholder="e.g. Pikachu"
            value={filter.value}
            onChangeCallback={(e) => setFilter(e.target.value)}
            type="text"
            name="search"
            id="search"
          />
          <label htmlFor="sort">
            Sort By: <i className="fas fa-sort"></i>
          </label>
          <select
            name="sort"
            id="sort"
            value={filtersort.value}
            onChange={(e) => setFilterSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A - Z</option>
            <option value="rev alphabetical">Z - A</option>
          </select>
          <Button
            type="submit"
            onClickCallback={(e) => {
              e.preventDefault();
              handleFilter();
            }}
          >
            Go <i className="fas fa-exclamation"></i>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarBuild;
