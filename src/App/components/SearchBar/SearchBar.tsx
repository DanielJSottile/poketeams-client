import React, { useContext, FunctionComponent, MouseEvent } from 'react';
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
import styles from './SearchBar.module.scss';
import { TextInput } from '../../@types';

type SearchBarProps = {
  /** passed in from Navigation, determines whether to use search or filter */
  isPublic: boolean;
};

const SearchBar: FunctionComponent<SearchBarProps> = ({ isPublic }) => {
  const {
    handleFilter,
    filter,
    filtersort,
    setFilter,
    setFilterSort,
    handleSearch,
    search,
    sort,
    setSearch,
    setSort,
  } = useContext(GeneralContext);

  const searchInput = isPublic ? search : filter;

  const handleSearchOrFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isPublic ? handleSearch() : handleFilter();
  };

  const setSearchOrFilter = (input: TextInput) =>
    isPublic ? setSearch(input) : setFilter(input);

  const sortOrFilterSort = isPublic ? sort : filtersort;

  const setSortOrFilterSort = (input: TextInput) =>
    isPublic ? setSort(input) : setFilterSort(input);

  return (
    <div className={styles['searchbar']}>
      <form className={styles['search-form']}>
        <div className={styles['search']}>
          <Input
            inputHasError
            isError={!!searchInput.value}
            validationCallback={() => validateSearch(searchInput)}
            inputClass={styles['s-input']}
            labelClass={styles['label-font']}
            label={'Search: '}
            labelIcon={<FontAwesomeIcon icon={faSearch} />}
            placeholder="e.g. Pikachu"
            value={searchInput.value}
            onChangeCallback={(e) =>
              setSearchOrFilter({ value: e.target.value, touched: true })
            }
            type="text"
            name="search"
            id="search"
          />
          <div className={styles['select']}>
            <label htmlFor="sort">
              Sort By: <FontAwesomeIcon icon={faSort} />
            </label>
            <select
              name="sort"
              id="sort"
              value={sortOrFilterSort.value}
              onChange={(e) =>
                setSortOrFilterSort({ value: e.target.value, touched: true })
              }
              onBlur={(e) =>
                setSortOrFilterSort({ value: e.target.value, touched: true })
              }
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="alphabetical">A - Z</option>
              <option value="rev alphabetical">Z - A</option>
            </select>
          </div>

          <Button
            buttonClass={styles['button']}
            type="submit"
            onClickCallback={(e) => {
              handleSearchOrFilter(e);
            }}
          >
            Go <FontAwesomeIcon icon={faExclamation} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
