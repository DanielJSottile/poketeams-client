import React, { useContext, FunctionComponent } from 'react';
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
            labelIcon={<i className="fas fa-search"></i>}
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
            Sort By:<i className="fas fa-sort"></i>{' '}
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
            Go <i className="fas fa-exclamation"></i>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarPublic;
