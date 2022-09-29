import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteTourApi } from '../redux/tours/toursAPI';

const DeleteTours = () => {
  const user = useSelector((store) => store.user);
  const tours = useSelector((store) => store.tours);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.length < 1) {
      navigate('/Login');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (tours.length < 1) {
      navigate('/');
    }
  }, [navigate, tours]);

  const deleteTour = (id) => {
    if (user.length > 0) {
      dispatch(deleteTourApi(id, user[0].token));
    }
  };

  useEffect(() => {
    document.title = 'Delete Tours';
  }, []);

  return (
    <div className="delete-container">
      <div className="grid-container">
        {tours.map((tour) => (
          <div key={tour.id} className="grid-element">
            <img src={tour.photo} alt={tour.title} />
            <div className="centered">
              <h2>{tour.title}</h2>
              <p>{`${tour.description.substr(0, 100)}...` }</p>
              {user.length > 0 ? (
                <button
                  type="button"
                  className={`${user[0].user.user_id === tour.user_id ? 'available delete-btn' : 'disable delete-btn'}`}
                  onClick={() => deleteTour(tour.id)}
                >
                  Delete
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteTours;
