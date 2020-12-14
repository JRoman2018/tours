import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
const url = 'https://course-api.com/react-tours-project';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    return setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length > 0) {
    return (
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    );
  }
  return (
    <main className="title">
      <h2>No tours left</h2>
      <button onClick={fetchTours} className="btn">
        Refresh
      </button>
    </main>
  );
}

export default App;
