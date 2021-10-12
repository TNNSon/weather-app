import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { debounce } from "lodash";
import Suggestion from "./suggestion";
import { ItemOption } from "../../props/types";
import "./inputSearch.css";

type Props = {
  onSearch: any;
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
  const handleBlur = () => {
    setShowResult(false);
  };
  const handleClickOutside = useCallback((event: Event) => {
    if (!wrapperRef?.current?.contains(event.target as Node)) {
      return handleBlur();
    }
  }, []);

  useEffect(() => {
    if (textSearch !== "" && data.length > 0) {
      setShowResult(true);
    }
  }, [textSearch, data]);

  const handleGetCityDebounce = useMemo(
    () => debounce(onSearch, 500),
    [onSearch]
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [handleClickOutside]);

  return (
    <>
      <div
        className="form-group search-input has-search col-md-6 mx-auto typeahead flex-column position-relative "
        ref={wrapperRef}
      >
        <label htmlFor="addFilter">Search weather </label>
        <div>
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
          {loading && (
            <span
              className="spinner-border spinner-border-sm input-loading"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </div>
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
