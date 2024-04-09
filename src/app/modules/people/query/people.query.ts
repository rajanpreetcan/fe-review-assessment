import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";

import { API_RESOURCE } from "@shared/constant";
import { useAxios } from "@shared/context";
import { Person } from "../model";
import { useSearchParams } from "react-router-dom";
interface PeopleQueryState {
  loading: boolean;
  data?: Person[];
  totalPages?: number;
  error?: AxiosError;
  currentOffset?: number;
  totalCount?: number;
}

export interface PeopleRequest {
  sort ?: string;
  search?: string | null;
  count: number;
  offset: number;
}

interface PeopleResponse {
  result: Person[];
  totalPages: number;
  offset: number;
  totalCount: number;
}


export const usePeopleQuery = (): PeopleQueryState => {
  const axios = useAxios();
  const [state, setState] = useState<PeopleQueryState>({ loading: false });

  const [searchParams] = useSearchParams();
  const offset = searchParams.get("offset");
  const count = searchParams.get("count");
  const sort = searchParams.get('sort') || 'ASC';
  const searchText = searchParams.get('search');

  useEffect(() => {
    setState(prevState => ({ ...prevState, loading: true  }));

    fetchPeoples({
      count: Number(count) || 10,
      offset: Number(offset) || 1,
      sort,
      search: searchText
    });
}, [searchParams]);

  const fetchPeoples = async (params: PeopleRequest) => {
    try {
      const { data } = await axios.get<PeopleResponse>(
        `/${API_RESOURCE.PEOPLE}`,
        {
          params,
        }
      );
      const { result, totalPages, offset, totalCount } = data;

      setState({
        loading: false,
        totalCount,
        error: undefined,
        data: result,
        totalPages,
        currentOffset: offset,
      });
    } catch (error) {
      setState({
        error: error as AxiosError,
        loading: false,
        data: undefined,
        totalPages: 0,
      });
    }
  };

  const value = useMemo(() => state, [state]);

  return value;
};
