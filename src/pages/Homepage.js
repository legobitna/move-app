import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import MovieBoard from "../components/MovieBoard";
import Pagination from "react-js-pagination";
import FilterBoard from "../components/FilterBoard";
const apiKey = process.env.REACT_APP_APIKEY;
const Homepage = ({ keyword, searchBy, setSearchBy }) => {
  let [movieList, setMovieList] = useState(null);
  let [originalList, setOriginalList] = useState(null);
  let [page, setPage] = useState(1);
  let [totalResult, setTotalResult] = useState(0);
  let [genres, setGenres] = useState(null);
  let [year, setYear] = useState({ min: 1980, max: 2020 });
  let [rating, setRating] = useState({ min: 0, max: 10 });

  const getGenres = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    let result = await fetch(url);
    let data = await result.json();
    console.log("genres", data);
    setGenres(data.genres);
  };

  const getNowPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    let result = await fetch(url);
    let data = await result.json();
    console.log(data.results);
    setMovieList(data.results);
    setOriginalList(data.results);
    setTotalResult(data.total_results);
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  const searchByKeyword = async () => {
    if (!keyword) {
      setSearchBy("nowPlaying");
      return;
    }
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${page}&query=${keyword}`;
    let result = await fetch(url);
    let data = await result.json();
    setMovieList(data.results);
    setOriginalList(data.results);
    setTotalResult(data.total_results);
  };
  const searchByTopRated = async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
    let result = await fetch(url);
    let data = await result.json();
    setMovieList(data.results);
    setOriginalList(data.results);
    setTotalResult(data.total_results);
  };

  const sortByRate = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.vote_average - b.vote_average);
    } else {
      sortedList = movieList.sort((a, b) => b.vote_average - a.vote_average);
    }
    setMovieList([...sortedList]);
  };

  const sortByPopular = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.popularity - b.popularity);
    } else {
      sortedList = movieList.sort((a, b) => b.popularity - a.popularity);
    }

    setMovieList([...sortedList]);
  };

  const filterByRate = (value) => {
    let filteredList = originalList.filter(
      (movie) =>
        movie.vote_average > value.min && movie.vote_average < value.max
    );
    setRating(value);
    setMovieList(filteredList);
  };

  const filterByYear = (value) => {
    let filteredList = originalList.filter((movie) => {
      let year = parseInt(movie.release_date.split("-")[0]);
      return year > value.min && year < value.max;
    });
    setYear(value);
    setMovieList(filteredList);
  };

  useEffect(() => {
    if (!genres) {
      getGenres();
    }
    if (!keyword == "") {
      searchByKeyword();
    } else if (searchBy == "" || searchBy == "nowPlaying") {
      getNowPlaying();
    } else if (searchBy == "topRated") {
      searchByTopRated();
    }
  }, [searchBy, keyword, page]);

  if (movieList == null) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Pagination
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={totalResult}
          pageRangeDisplayed={5}
          onChange={(pageNum) => handlePageChange(pageNum)}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
      <Row style={{ marginTop: "40px", marginLeft: "40px" }}>
        <Col md={3}>
          <FilterBoard
            sortByRate={sortByRate}
            sortByPopular={sortByPopular}
            filterByYear={filterByYear}
            filterByRate={filterByRate}
            year={year}
            rating={rating}
          />
        </Col>
        <Col md={9}>
          <MovieBoard movieList={movieList} genres={genres} />
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;
