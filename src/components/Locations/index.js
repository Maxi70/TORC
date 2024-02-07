import algoliasearch from "algoliasearch";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { connectAutoComplete, InstantSearch } from "react-instantsearch-dom";
import styles from "./Locations.module.css";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME;

function Autocomplete(props) {
  const [searchValue, setSearchValue] = useState(props.currentRefinement);

  useEffect(() => {
    setSearchValue(props.currentRefinement);
  }, [props.currentRefinement]);

  const onChange = (event, { newValue }) => {
    setSearchValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value, reason }) => {
    props.refine(value);
  };

  const onSuggestionsClearRequested = () => {
    // onSuggestionsClearRequested needs to be implemented
    // but calling the function below in the body results
    // in the input value being lost (due to InstantSearch sending back the empty value)
    // Hence this is empty function for now
    // props.refine();
  };

  const getSuggestionValue = (hit) => {
    return `${hit.country_name}, ${hit.state_name}, ${hit.name}`;
  };

  const renderSuggestion = (hit) => {
    return `${hit.country_name}, ${hit.state_name}, ${hit.name}`;
  };

  const renderInputComponent = (inputProps) => {
    return (
      <div className={styles.locationSearchWrapper}>
        <input
          {...inputProps}
          type="search"
          className={styles.locationSearch}
          id="locationSearch"
        />
      </div>
    );
  };

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    if (!children) {
      return <div {...containerProps}>{children}</div>;
    }

    return (
      <div
        {...containerProps}
        className={classNames(containerProps.className, styles.searchBorder)}
      >
        {children}
      </div>
    );
  };

  const inputProps = {
    onChange,
    value: searchValue,
  };

  return (
    <Autosuggest
      suggestions={props.hits}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
      renderSuggestionsContainer={renderSuggestionsContainer}
      onSuggestionSelected={props.onSuggestionSelected}
      focusInputOnSuggestionClick={false}
    />
  );
}

const CustomAutocomplete = connectAutoComplete(Autocomplete);

export default function SearchLocations({ location, setLocation }) {
  const [search, setSearch] = useState({ query: "", page: 1 });

  useEffect(() => {
    if (location?.id) {
      setSearch({
        query: `${location.country_name}, ${location.state_name}, ${location.name}`,
        page: 1,
      });
    }
  }, [location]);

  const onSuggestionSelected = (e, { suggestion }) => {
    const selection = JSON.parse(JSON.stringify(suggestion));
    delete selection.__position;
    delete selection.objectID;
    delete selection._highlightResult;

    setLocation(selection);
  };

  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        searchState={search}
        onSearchStateChange={(s) => {
          setSearch(s);
          if (s.query !== search.query || !s.query) {
            setLocation(undefined);
          }
        }}
      >
        <CustomAutocomplete onSuggestionSelected={onSuggestionSelected} />
      </InstantSearch>
    </>
  );
}
