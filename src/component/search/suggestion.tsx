import React, { useRef } from "react";
import "./inputSearch.css";

import { ItemOption } from "../../props/types";
type Props = {
  data: ItemOption[] | [];
  show: boolean;
  loading: boolean;
  onChange: Function;
};
type ItemProps = {
  data: ItemOption;
  onChange: Function;
};
const SuggestionItem: React.FC<ItemProps> = ({ data, onChange }) => {
  const handleSelect = () => {
    onChange(data.id);
  };
  return (
    <li
      data-testid={data.id}
      className="list-group-item"
      key={data.id}
      onClick={handleSelect}
    >
      {data.text}
    </li>
  );
};
const Suggestion: React.FC<Props> = ({ data, onChange, show, loading }) => {
  const handleSelect = (value: number) => {
    onChange(value);
  };
  const wrapperRef = useRef<HTMLUListElement>(null);

  return (
    <>
      {show && (
        <ul
          className="typeahead-dropdown list-group suggestion-container overflow-auto"
          id="suggestion-container"
          data-testid="suggestion-container"
          ref={wrapperRef}
          tabIndex={0}
        >
          {data.map((item) => {
            return (
              <SuggestionItem
                key={item.id}
                data={item}
                onChange={handleSelect}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Suggestion;
