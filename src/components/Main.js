import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import Swiper for carrousel
import {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchApiDataTours } from '../redux/tours/toursAPI';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Main = () => {
  const tours = useSelector((store) => store.tours);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApiDataTours());
  }, [dispatch]);

  useEffect(() => {
  }, [user]);

  useEffect(() => {
  }, [tours]);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div className="main-container">
      <div className="header">
        <h1>LATEST TOURS</h1>
        <p>
          {user.length > 0 ? `Hello ${user[0].user.name}, ` : ''}
          Please select a Tour
        </p>
      </div>
      <Swiper
        className="slide-container"
      // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={25}
        slidesPerView={2}
        // loop
        // centeredSlides
        grabCursor="true"
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          850: {
            slidesPerView: 2,
          },
        }}
      >
        {tours.map((tour) => (
          <SwiperSlide key={tour.id}>
            <Link to={`/TourDetails/${tour.id}`}>
              <div className="image-content">
                <div className="card-image">
                  <img
                    src={tour.photo}
                    alt={tour.title}
                    className="card-img"
                  />
                </div>
              </div>
              <div className="card-content">
                <h3 className="name">{tour.title}</h3>
                <span className="dots-division">...............</span>
                <p className="description">{`${tour.description.substr(0, 50)}...`}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Main;
