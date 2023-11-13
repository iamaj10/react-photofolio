import { useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const AlbumForm = ({ addAlbum }) => {
  const myRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();

    const title = myRef.current.value;
    const album = {
      title: title,
    };

    addAlbum(album);
    clearInput();
    return;
  };

  const clearInput = () => {
    myRef.current.value = "";
  };

  return (
    <div className="my-4 p-4" style={{ backgroundColor: "lightgray" , borderRadius: "10px"}}>
      <h1 className="text-center ">Create an album</h1>
      <Row className="px-3">
        <Col md={10}>
          <Form.Control
            ref={myRef}
            type="text"
            placeholder="Enter the album name"
            style={{ borderRadius: "10px" }}
          ></Form.Control>
        </Col>
        <Col md={2} className="d-flex justify-content-end">
          <Button variant="secondary" className="mx-1" onClick={() => (myRef.current.value = "")}>
            Clear
          </Button>

          <Button variant="secondary" onClick={handleClick}>Add</Button>
        </Col>
      </Row>
    </div>
  );
};

export default AlbumForm;
