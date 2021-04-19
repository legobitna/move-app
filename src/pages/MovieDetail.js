import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const apiKey = process.env.REACT_APP_APIKEY;
const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const getSingleMovie = async () => {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setMovie(data);
  };
  useEffect(() => {
    console.log("effect2");
    if (id) {
      console.log("effect");
      getSingleMovie();
    }
  }, []);
  if (movie == null) {
    return <h1>Loading...</h1>;
  }
  return (
    <div style={{ height: "100vh" }}>
      <Container>
        <h2 style={{ color: "red" }}>{movie.title}</h2>
        <Row>
          <Col>
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
            />
          </Col>
          <Col style={{ color: "white" }}>
            <h3>Budget:{movie.budget}</h3>
            <h3>date:{movie.release_date}</h3>
            <h3>run time:{movie.runtime}</h3>
            <p>{movie.overview}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetail;
