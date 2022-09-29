import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetReservationsAPI, deleteReservationApi } from '../redux/reservations/reservations';

const Reservations = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length < 1) {
      navigate('/Login');
    }
  }, [navigate, user]);

  const dispatch = useDispatch();
  const reservations = useSelector((store) => store.reservations);
  useEffect(() => {
    if (user.length > 0) {
      dispatch(GetReservationsAPI(user[0].token));
    }
  }, [dispatch, user]);

  const deleteReservation = (obj) => {
    if (user.length > 0) {
      dispatch(deleteReservationApi(obj, user[0].token));
    }
    navigate('/Reservations');
  };
  useEffect(() => {
    document.title = 'My reservations';
  }, []);
  if (reservations.length > 0) {
    return (
      <div className="reservation-countainer">
        {reservations.map((obj) => (
          <div
            className="tour-details"
            key={obj.reservation_id}
          >
            <div className="tour-photo">
              <img src={obj.tour.photo} alt="Tour" />
            </div>
            <div className="tour-data">
              <h2 className="tour-title">{obj.tour.title}</h2>
              <p className="tour-description">{obj.tour.description}</p>
              <div className="tour-city">
                <p>City:</p>
                <p>{obj.tour.city}</p>
              </div>
              <div className="tour-duration">
                <p>Duration (weeks):</p>
                <p>{obj.tour.duration}</p>
              </div>
              <div className="tour-cost">
                <p>Cost:</p>
                <p>{obj.tour.cost}</p>
              </div>
              <div className="tour-duration num-people">
                <p>Number of persons:</p>
                <p>{obj.persons_number}</p>
              </div>
              <div className="tour-cost">
                <p>Reservation Date:</p>
                <p>{obj.reservation_date}</p>
              </div>
              <div className="tour-reserve-btn">
                <button className="cancel-btn" type="button" onClick={() => deleteReservation(obj)}>Cancel Reservation</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="no-reservations">
      <p>You have no reservations yet</p>
    </div>
  );
};

export default Reservations;
