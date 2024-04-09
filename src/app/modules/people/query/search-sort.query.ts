import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SORT = {
  ASC: "ASC",
  DESC: "DESC",
};

export const useSearchSortQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort") || SORT.ASC;
  const isAscending = sortOrder === SORT.ASC;
  const [searchText, setSearchText] = useState(searchParams.get("search") || "")

  const onSearch = useCallback((searchText: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchText) {
      newSearchParams.set("search", searchText);
    } else {
      newSearchParams.delete("search");
    }
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  const onSort = useCallback(() => {
    searchParams.set("sort", isAscending ? SORT.DESC : SORT.ASC);
    setSearchParams(searchParams);
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  }

  return { onSort, handleSearch, sortOrder, searchText };
};
