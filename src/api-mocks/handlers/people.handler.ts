import { rest } from "msw";

import { API_RESOURCE } from "../../app/shared/constant";
import { PEOPLE } from "../fixtures";
import { delayedResponse } from "../utils";
import { SORT } from "../../app/modules/people/query";

interface Person {
  name: string;
}

const BASE_URL = `/mock-api/${API_RESOURCE.PEOPLE}*`;

const paginateAndFilterPeople = (people: Person[], offset: number, count: number, sort: string, searchText?: string | null): Person[] => {
  let filteredPeople = people;

  if (searchText) {
    filteredPeople = people.filter(person => person.name.includes(searchText));
  }

  filteredPeople = filteredPeople.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sort === SORT.ASC ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const startIndex = count * (offset - 1);
  const endIndex = count * offset;
  const paginatedResult = filteredPeople.slice(startIndex, endIndex);

  return paginatedResult;
};

export const getPeople = rest.get(BASE_URL, (req, res, ctx) => {
  const url = new URL(req.url);
  const offset = Number(url.searchParams.get("offset"));
  const count = Number(url.searchParams.get("count"));
  const sort: string = url.searchParams.get("sort") as string;
  const searchText = url.searchParams.get('search');

  const totalPages = Math.ceil(PEOPLE.length / count);
  const totalCount = PEOPLE.length;

  const paginatedResult = paginateAndFilterPeople(PEOPLE, offset, count, sort, searchText);

  return delayedResponse(
    ctx.status(200),
    ctx.json({ result: paginatedResult, totalPages, offset, totalCount })
  );
});

export const handlers = [getPeople];
