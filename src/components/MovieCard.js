import React, { useState } from "react";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
  Modal,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const apiKey = process.env.REACT_APP_APIKEY;
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Trailer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p>
          <iframe
            width="760"
            height="515"
            src={`https://www.youtube.com/embed/${props.link}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function MovieCard({ movie, genres }) {
  let [modalShow, setModalShow] = useState(false);
  let [link, setLink] = useState("");
  let history = useHistory();

  const openTrailer = async () => {
    let url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`;
    let result = await fetch(url);
    let data = await result.json();
    setModalShow(true);
    setLink(data.results[0].key);
  };

  const getDetailPage = () => {
    history.push(`/movie/${movie.id}`);
  };
  return (
    <>
      <Card style={{ width: "18rem" }} onClick={getDetailPage}>
        <Card.Img
          style={{ height: "430px" }}
          variant="top"
          src={
            movie.poster_path == null
              ? `./noimage.jpg`
              : `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`
          }
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text style={{ overflow: "scroll", height: "200px" }}>
            {movie.overview}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Rate: {movie.vote_average}</ListGroupItem>
          <ListGroupItem>Popularilty: {movie.popularity}</ListGroupItem>
          <ListGroupItem style={{ height: "72px" }}>
            {movie.genre_ids.map((genre) => {
              return (
                <Badge variant="danger" style={{ marginRight: "10px" }}>
                  {genres.find((item) => item.id == genre).name}
                </Badge>
              );
            })}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant="danger" onClick={() => openTrailer()}>
            View Trailer
          </Button>
        </Card.Body>
      </Card>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        link={link}
      />
    </>
  );
}
