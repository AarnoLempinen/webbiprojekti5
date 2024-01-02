import { createContext } from "react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtToken, userData } from "./Signals";

const MovieReviewApp = () => {
    const [user, setUser] = useState(userData.value);
    const [movies, setMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ movieId: '', rating: '', comment: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [movieReviews, setMovieReviews] = useState({});
  
    useEffect(() => {
      // Fetch movies from TMDb
      async function fetchMovies() {
        try {
          const apiKey = '';
          const result = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
              api_key: apiKey,
              sort_by: 'popularity.desc',
            },
          });
  
          if (!result.data.results) {
            console.error('Error loading movies or data.results is not defined.');
            return;
          }
  
          const movieList = result.data.results;
          setMovies(movieList);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      }
  
      fetchMovies();
    }, []);
  
    const handleReviewSubmit = (event, movieId) => {
      event.preventDefault();
  
      axios.post('http://localhost:3001/user/addreview', {
        username: userData.value?.private,
        product_id: movieId,
        rating: movieReviews[movieId]?.rating || newReview.rating,
        comment: movieReviews[movieId]?.comment || newReview.comment,
      })
        .then((response) => {
          console.log(response);
        })
        .catch(error => console.error('Error submitting review:', error));
    };
  
    const handleSearchInputChange = (event) => {
      setSearchTerm(event.target.value.toLowerCase());
    };
  
    const handleRatingChange = (movieId, rating) => {
      setMovieReviews({
        ...movieReviews,
        [movieId]: {
          ...movieReviews[movieId],
          rating: rating,
        },
      });
    };
  
    const handleCommentChange = (movieId, comment) => {
      setMovieReviews({
        ...movieReviews,
        [movieId]: {
          ...movieReviews[movieId],
          comment: comment,
        },
      });
    };
  
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm)
    );
  
    return (
      <div>
        <h2>Movie Reviews</h2>
  
        <div>
          <label>
            Search Movies:
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </label>
        </div>
  
        <ul>
          {filteredMovies.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
  
              {user && (
                <form onSubmit={(event) => handleReviewSubmit(event, movie.id)}>
                  <label>
                    Rating:
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={movieReviews[movie.id]?.rating || newReview.rating}
                      onChange={(e) => handleRatingChange(movie.id, e.target.value)}
                    />
                  </label>
                  <label>
                    Comment:
                    <input
                      type="text"
                      value={movieReviews[movie.id]?.comment || newReview.comment}
                      onChange={(e) => handleCommentChange(movie.id, e.target.value)}
                    />
                  </label>
                  <button type="submit">Submit Review</button>
                </form>
              )}
            </li>
          ))}
        </ul>
  
        <h2>Your Reviews</h2>
  
        <ul>
          {reviews.map(review => (
            <li key={review._id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MovieReviewApp;
