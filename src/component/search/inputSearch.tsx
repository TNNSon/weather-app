import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import Suggestion from "./suggestion";
import { ItemOption } from "../../props/types";
import "./inputSearch.css";

type Props = {
  onSearch: Function;
  onChange: Function;
  data: ItemOption[];
  loading: boolean;
};

const InputSearch: React.FC<Props> = ({
  onChange,
  onSearch,
  data,
  loading,
}) => {
  const [textSearch, setTextSearch] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textSearch !== "" && data.length > 0) {
      setShowResult(true);
    }
  }, [textSearch, data]);

  const handleGetCityDebounce = useCallback(
    debounce((v) => onSearch(v), 500),
    []
  );

  const handleUserInput = (e: { target: HTMLInputElement }) => {
    let value = e.target.value;
    setTextSearch(value);
    handleGetCityDebounce(value);
  };

  const handleSelect = (value: number) => {
    setShowResult(false);
    onChange(value);
  };

  const handleFocus = (e: { target: HTMLInputElement }) => {
    if (textSearch !== "") {
      setShowResult(true);
    }
  };

  const handleBlur = () => {
    setShowResult(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  const handleClickOutside = (event: Event) => {
    if (!wrapperRef?.current?.contains(event.target as Node)) {
      return handleBlur();
    }
  };
  return (
    <>
      <div
        className="form-group has-search col-md-6 mx-auto typeahead flex-column position-relative"
        ref={wrapperRef}
      >
        <label htmlFor="addFilter">Search weather </label>
        <input
          type="text"
          className="form-control typeahead-input"
          id="searchWearther"
          autoComplete="off"
          value={textSearch}
          onChange={handleUserInput}
          onFocus={handleFocus}
          placeholder="Search city here..."
          aria-label="Search city here..."
          data-testid="searchWeather"
        />
        {showResult && (
          <Suggestion
            data={data}
            loading={loading}
            onChange={handleSelect}
            show={showResult}
          />
        )}
      </div>
    </>
  );
};

export default InputSearch;
