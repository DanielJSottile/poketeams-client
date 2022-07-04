import React, { useContext, FunctionComponent, MouseEvent } from 'react';
import {
  faSearch,
  faSort,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextInput } from '../../@types';
import GeneralContext from '../../contexts/GeneralContext';
import { validateSearch } from '../../utils/validations';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import styles from './SearchBar.module.scss';

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
            containerClass={styles['search-container']}
            inputClass={styles['s-input']}
            labelClass={styles['label-font']}
            label={isPublic ? 'Search: ' : 'Filter: '}
            labelIcon={<FontAwesomeIcon icon={faSearch} />}
            placeholder='e.g. Pikachu'
            value={searchInput.value}
            onChangeCallback={(e) =>
              setSearchOrFilter({ value: e.target.value, touched: true })
            }
            type='text'
            name='search'
            id='search'
          />
          <Select
            selectHasError={false}
            containerClass={styles['select']}
            htmlFor='sort'
            label='Sort By: '
            labelIcon={<FontAwesomeIcon icon={faSort} />}
            name='sort'
            id='sort'
            value={sortOrFilterSort.value}
            onChangeCallback={(e) =>
              setSortOrFilterSort({ value: e.target.value, touched: true })
            }
            options={[
              { value: 'newest', label: 'Newest' },
              { value: 'oldest', label: 'Oldest' },
              { value: 'alphabetical', label: 'A - Z' },
              { value: 'rev alphabetical', label: 'Z - A' },
            ]}
          />
          <Button
            buttonClass={styles['go-button']}
            id='go-button'
            type='submit'
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
