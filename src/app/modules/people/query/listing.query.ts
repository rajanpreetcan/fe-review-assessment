import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useListingQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemCount = searchParams.get('count') || '10';
  
  const onListingClick = useCallback((offset: number) => {
    searchParams.set("offset", String(offset));
    setSearchParams(searchParams);
  }, []);

  const handleItemCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVal = event.target.value;
    searchParams.set("count", selectedVal);
    setSearchParams(searchParams);
  };

  return { itemCount, onListingClick, handleItemCountChange };
};
