import Input from "components/FormComponents/Input";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { API } from "aws-amplify";
import { searchSkills } from "graphql/autoQueries";
import XIcon from "components/XIcon";

const SkillSearch = forwardRef(
  ({ name, control, register, isReadOnly }, ref) => {
    const {
      fields: skills,
      append,
      remove,
    } = useFieldArray({ name, control, keyName: `key` });

    const [search, setSearch] = useState(``);
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFetched, setIsFetched] = useState(true);

    const searchDebounceRef = useRef();

    useEffect(() => {
      clearTimeout(searchDebounceRef.current);

      setIsFetched(false);

      searchDebounceRef.current = setTimeout(async () => {
        if (search.length > 0) {
          const res = await API.graphql({
            query: searchSkills,
            variables: { term: search },
            //authMode: "API_KEY",
          });
          setSearchResults(res?.data?.searchSkills);
          setIsFetched(true);
        }
      }, 300);
    }, [search]);

    let searchResultsRender = searchResults
      ?.filter(({ name }) => !skills?.map(({ name }) => name)?.includes(name))
      ?.map(({ id, infoUrl, name, type }) => (
        <p
          key={id}
          className="hover:bg-gray-200 px-2 cursor-pointer"
          style={{ borderRadius: `4px` }}
          onClick={() => {
            append({ id, infoUrl, name, type });
            setSearch(``);
            setIsDropdownOpen(false);
          }}
        >
          {name}
        </p>
      ));
    if (searchResultsRender.length === 0)
      searchResultsRender = <p>No results.</p>;

    const outerRef = useRef(null);
    useEffect(() => {
      const onPointerUp = (evt) => {
        if (!outerRef.current) return;
        if (!outerRef.current.contains(evt.target)) setIsDropdownOpen(false);
      };
      window.addEventListener(`pointerup`, onPointerUp);
      return () => void window.removeEventListener(`pointerup`, onPointerUp);
    }, []);

    return (
      <div ref={outerRef}>
        <div className="relative">
          <Input
            value={search}
            onChange={(evt) => void setSearch(evt.target.value)}
            onFocus={() => void setIsDropdownOpen(true)}
            ref={ref}
            isReadOnly={isReadOnly}
          />
          {isDropdownOpen && search?.length > 0 && (
            <div className="absolute top-full w-full mt-1 p-4 rounded-sm bg-white shadow-sm flex flex-col gap-2 z-10">
              {isFetched ? searchResultsRender : <p>Loading...</p>}
            </div>
          )}
        </div>
        {skills?.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {skills?.map((field, index) => (
              <span
                key={field.id}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded font-bold flex gap-2 items-center"
              >
                {field.name}
                <button
                  type="button"
                  className="increase-touch-target"
                  onClick={() => !isReadOnly && void remove(index)}
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default SkillSearch;
