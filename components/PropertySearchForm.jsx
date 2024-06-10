import { handleSearchQueries, handleSortQueries } from "@/app/properties/actions";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import SortButtons from "./SortButtons";

function PropertySearchForm({ searchParams = { location: "", type: "All" } }) {
  console.log(searchParams);
  return (
    <section className="bg-blue-700 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        <form
          action={handleSearchQueries}
          className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
        >
          <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={searchParams.location}
              placeholder="Enter Location (City, State, Zip, etc"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-2/5 md:pl-2">
            <label htmlFor="property-type" className="sr-only">
              Property Type
            </label>
            <select
              id="property-type"
              name="property-type"
              defaultValue={searchParams.type}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Condo">Condo</option>
              <option value="House">House</option>
              <option value="Cabin Or Cottage">Cabin or Cottage</option>
              <option value="Loft">Loft</option>
              <option value="Room">Room</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Search
          </button>

          <div className="inline-flex rounded md:ml-4  " role="group">
            <button
              formAction={handleSortQueries.bind(null, { ...searchParams, sort: "desc" })}
              className=" w-full md:w-auto px-4 py-2 rounded-s bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Desc
            </button>
            <button
              formAction={handleSortQueries.bind(null, { ...searchParams, sort: "asc" })}
              className=" w-full md:w-auto px-4 py-2 rounded-e bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Asc
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PropertySearchForm;
