import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { GetToursAPI } from '../redux/tours/toursAPI';

const TourDetails = () => {
  const { tourID } = useParams();
  const dispatch = useDispatch();
  const Store = useSelector((store) => store.tours);
  useEffect(() => {
    document.title = dispatch(GetToursAPI(tourID));
  }, [dispatch, tourID]);
  const tour = Store[0];

  useEffect(() => {
    document.title = 'Tour Details';
  }, []);

  if (tour !== undefined) {
    return (
      <div className="tour-details">
        <div className="tour-photo">
          <img src={tour.photo} alt="Tour" />
        </div>
        <div className="tour-data">
          <h2 className="tour-title">{tour.title}</h2>
          <p className="tour-description">{tour.description}</p>
          <div className="tour-city">
            <p>City:</p>
            <p>{tour.city}</p>
          </div>
          <div className="tour-duration">
            <p>Duration (weeks):</p>
            <p>{tour.duration}</p>
          </div>
          <div className="tour-cost">
            <p>Cost:</p>
            <p>{tour.cost}</p>
          </div>
          <p className="tour-available">Available Now</p>
          <div className="tour-reserve-btn">
            <button className="reservations-btn" type="button"><Link className="reservations-link" to="/ReservationsForm">Reservations</Link></button>
          </div>
        </div>
      </div>
    );
  }
  return false;
};
export default TourDetails;
