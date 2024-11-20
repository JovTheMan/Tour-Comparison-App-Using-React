import React, { useState, useEffect } from 'react';
import './Gallery.css';

/**
 * Fetches and displays a list of tours.
 * Includes functionality to remove a tour and toggle tour descriptions.
 */
function Gallery() {
  const [tours, setTours] = useState([]); // State to store tour data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tour data from the API when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('https://course-api.com/react-tours-project');
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      setTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const toggleDescription = (id) => {
    setTours(
      tours.map((tour) =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} className="tour-image" />
          <div className="tour-details">
            <h2>{tour.name}</h2>
            <h4>${tour.price}</h4>
            <p>
              {tour.showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
              <button
                className="toggle-btn"
                onClick={() => toggleDescription(tour.id)}
              >
                {tour.showMore ? 'Show Less' : 'Read More'}
              </button>
            </p>
            <button className="remove-btn" onClick={() => removeTour(tour.id)}>
              Not Interested
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
