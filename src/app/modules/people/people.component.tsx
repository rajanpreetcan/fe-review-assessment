import React, { useMemo } from "react";
import { Person } from "./model";
import { SORT, usePeopleQuery, useSearchSortQuery, useCreatePerson } from "./query";
import "./people.css";
import { Listing, PersonForm } from "./components";
import { formatDate } from "@/app/shared/util/common";

interface PeopleProps {}

const PeopleTable: React.FC<{
  people: any;
  loading: boolean;
  error: any;
  sortOrder: String;
  handleSearch: (value: string) => void;
  onSort: () => void;
}> = ({ people, loading, error, sortOrder, handleSearch, onSort }) => {
  const isAscending = sortOrder === SORT.ASC;

  const renderColumns = ({ name, show, actor, movies, dob }: Person) => {
    const movieNames = movies.map(({ title }) => title).join(", ");
    return (
      <>
        <td>{name}</td>
        <td>{show}</td>
        <td>{actor}</td>
        <td>{formatDate(dob)}</td>
        <td>{movieNames}</td>
      </>
    );
  };
  
  const renderRows = useMemo(() => {
    if (loading) {
      return <p>Fetching People...</p>;
    }
    if (!people || error) {
      return <h2>Oops! Looks like something went wrong!</h2>;
    }
    if (people.length === 0) {
      return (
        <tr>
          <td>
            <h2 className="no-data-msg">No People Available.</h2>
          </td>
        </tr>
      );
    }
    return people.map((person: any, index: number) => <tr key={index}>{renderColumns(person)}</tr>);
  }, [people, loading, error]);

  return (
    <table className="people-table">
      <thead>
        <tr>
          <th className="sort-trigger" aria-sort={isAscending ? "ascending" : "descending"} onClick={onSort}>
            Name [Click to sort]
          </th>
          <th>Show</th>
          <th>Actor/Actress</th>
          <th>Date of birth</th>
          <th>Movies</th>
        </tr>
      </thead>
      <tbody>{renderRows}</tbody>
    </table>
  );
};

export const People: React.FC<PeopleProps> = () => {
  const { onCreatePerson } = useCreatePerson();
  const { data: people, loading, error, currentOffset = 1, totalPages = 0, totalCount } = usePeopleQuery();

  const { onSort, handleSearch, sortOrder, searchText } = useSearchSortQuery();

  return (
    <>
      <PersonForm onCreatePerson={onCreatePerson} />
      <div>
        <input id="Search" name="search" aria-label="Search" placeholder="Search" value={searchText} type="text" className="search-input" onChange={({ target: { value } }) => handleSearch(value)} />
      </div>
      <PeopleTable people={people} loading={loading} error={error} sortOrder={sortOrder} handleSearch={handleSearch} onSort={onSort} />
      <div className="result-container">
        <Listing currentOffset={currentOffset} totalPages={totalPages} totalCount={totalCount} />
      </div>
    </>
  );
};
