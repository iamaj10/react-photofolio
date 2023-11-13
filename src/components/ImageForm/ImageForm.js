import { useRef, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const ImageForm = ({
  addImage,
  ImageToUpdate,
  resetImageToUpdate,
  updateImage,
  setToggleAdd,
}) => {
  const titleRef = useRef();
  const urlRef = useRef();

  console.log(ImageToUpdate);

  useEffect(() => {
    if (!ImageToUpdate) return;
    titleRef.current.value = ImageToUpdate.title;
    urlRef.current.value = ImageToUpdate.url;
  }, [ImageToUpdate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const url = urlRef.current.value;
    if (!url) {
      return;
    }
    if (!ImageToUpdate) {
      const image = {
        title: title,
        url: url,
      };
      addImage(image);
      clearInput();
      return;
    }

    const image = {
      title: title,
      url: url,
      id: ImageToUpdate.id,
    };

    const result = updateImage(image);
    if (!result) return;
    clearInput();
    resetImageToUpdate();
  };

  const clearInput = () => {
    titleRef.current.value = "";
    urlRef.current.value = "";
    resetImageToUpdate();
  };

  return (
    <div
      className="my-4 p-4"
      style={{ backgroundColor: "lightgray", borderRadius: "10px" }}
    >
      <h1 className="text-center my-3">Add an image</h1>
      <Row>
        <Col md={10}>
          <Form.Control
            ref={titleRef}
            type="text"
            placeholder="Enter the Image title"
            style={{ borderRadius: "10px" }}
          ></Form.Control>
          <Form.Control
            className="mt-1"
            ref={urlRef}
            type="text"
            placeholder="Enter the Image url"
            style={{ borderRadius: "10px" }}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Button
            variant="secondary"
            className="mx-1 w-100"
            onClick={clearInput}
          >
            Clear
          </Button>
          <Button
            variant="secondary"
            className="mx-1 mt-1 w-100"
            onClick={onSubmitHandler}
          >
            {ImageToUpdate ? "Edit" : "Add "}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ImageForm;
