import React from 'react';
import PropTypes from 'prop-types';
const regex = /(.*)(?=(, \d{3} \d{2}))/;

function PlacesList(props) {
  const { list } = props;
  if (!list) return null;
  return (
    <div className="row justify-content-md-center list-all">
      <div className="col-12">
        <h3>Or maybe something else?</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {list.map((place, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <a target="_blank" href={place.website}>
                    {place.name}
                  </a>{' '}
                  <br /> {(regex.exec(place.address) || [''])[0]}
                </td>
                <td>
                  <button
                    // onClick={() => goPlaces(place.placeId)}
                    className={`btn-lg btn-${
                      place.open ? 'success' : 'danger'
                    }`}
                  >
                    I prefer this
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

PlacesList.propTypes = {
  list: PropTypes.array
};

export default PlacesList;
