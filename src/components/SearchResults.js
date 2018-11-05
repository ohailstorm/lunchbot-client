import React from 'react';

export default function SearchResults({
  searchResults,
  addPlace = () => null
}) {
  if (!searchResults) return null;
  return (
    <div className="col-12">
      <h3>Search Results</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Place ID</th>
          </tr>
        </thead>
        <tbody>
          {searchResults &&
            searchResults.length &&
            searchResults.map((place, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <a target="_blank" href={place.mapUrl}>
                    {place.name}
                  </a>
                </td>
                <td>{place.address}</td>
                <td>
                  <button
                    onClick={() => addPlace(place.placeId)}
                    className="btn btn-success"
                    type="button"
                  >
                    Add
                  </button>
                </td>
                {/* <td>{place.placeId}</td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
