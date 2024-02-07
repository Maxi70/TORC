import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Search } from "semantic-ui-react";
import { ReactComponent as Clear } from "images/new/5-icon_close.svg";
import Spinner from "components/Spinner";

const SearchField = ({
  input,
  loading,
  value,
  onSearchChange,
  onResultSelect,
  results,
  resultRenderer,
  className,
  fluid,
  debounce,
}) => {
  const [query, setQuery] = useState(value);
  const [isLoading, setIsLoading] = useState(loading);

  const skillSearchTimeoutRef = useRef();

  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(skillSearchTimeoutRef.current);

    setQuery(data.value);
    setIsLoading(true);

    skillSearchTimeoutRef.current = setTimeout(async () => {
      await onSearchChange(e, data);
      setIsLoading(false);
    }, debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResultSelect = useCallback(
    (e, data) => {
      setQuery("");
      onResultSelect(e, data);
    },
    [onResultSelect]
  );

  return (
    <div className="relative bg-brandSecondary-100 flex items-center sm:w-2/3 w-full before:bg-brandSecondary-100 before:absolute before:left-0 before:ml-[-600px] rounded-sm before:h-17 before:w-full">
      <Search
        input={input}
        placeholder="Start typing"
        loading={isLoading}
        value={query}
        onSearchChange={handleSearchChange}
        onResultSelect={handleResultSelect}
        results={results}
        resultRenderer={resultRenderer}
        noResultsMessage={isLoading && "Loading results..."}
        showNoResults={false}
        className={className}
        fluid={fluid}
      />
      {!isLoading ? (
        <Clear
          className="cursor-pointer absolute right-4"
          onClick={() => setQuery("")}
        />
      ) : (
        <Spinner className="absolute right-4" />
      )}
    </div>
  );
};

SearchField.propTypes = {
  input: PropTypes.object,
  loading: PropTypes.bool,
  value: PropTypes.string,
  onStartSearch: PropTypes.func,
  onSearchChange: PropTypes.func,
  onResultSelect: PropTypes.func,
  results: PropTypes.array,
  resultRenderer: PropTypes.func,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  debounce: PropTypes.number,
};

SearchField.defaultProps = {
  input: { icon: "search", fluid: true },
  loading: false,
  value: "",
  onStartSearch: () => {},
  onSearchChange: () => {},
  onResultSelect: () => {},
  results: [],
  resultRenderer: () => {},
  className: "",
  fluid: true,
  debounce: 300,
};

export default SearchField;
