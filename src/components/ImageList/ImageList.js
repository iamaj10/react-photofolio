import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Spinner from "react-spinner-material";
import ImageForm from "../ImageForm/ImageForm";
import CarouselComp from "../Carousel/Carousel";
import "./ImageList.css";

const ImageList = ({
  albumID,
  albumTitle,
  images,
  getData,
  loading,
  setPageTitle,
  addImage,
  ImageToUpdate,
  resetImageToUpdate,
  updateImage,
  setImageToUpdate,
  deleteImage,
}) => {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toggleCarousel, setToggleCarousel] = useState(false);

  useEffect(() => {
    getData(albumID);
  }, [images]);

  useEffect(() => {
    if (!ImageToUpdate) return;
    setToggleAdd(true);
  }, [ImageToUpdate]);

  // console.log("ImageToUpdate", ImageToUpdate);

  const handleChanges = (e) => {
    e.preventDefault();
    setPageTitle("Albums");
  };

  const openCarousel = (image) => {
    setSelectedImage(image);
    setToggleCarousel(!toggleCarousel);
  };

  const closeCarousel = () => {
    setToggleCarousel(false);
  };

  // console.log(images);
  return (
    <Container>
      {loading ? (
        <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
      ) : null}
      {toggleCarousel && selectedImage ? (
        <CarouselComp
          image={selectedImage}
          onClose={closeCarousel}
          images={images}
        />
      ) : (
        <>
          {toggleAdd ? (
            <ImageForm
              addImage={addImage}
              ImageToUpdate={ImageToUpdate}
              resetImageToUpdate={resetImageToUpdate}
              updateImage={updateImage}
              setToggleAdd={setToggleAdd}
            />
          ) : null}

          <div
            className="d-flex justify-content-between mx-5 my-5 px-5"
            style={{ width: "100%" }}
          >
            <div>
              <Button variant="secondary" onClick={handleChanges}>
                Back
              </Button>
            </div>
            <div>
              <h1>Images in {albumTitle}</h1>
            </div>
            <div>
              <Button
                variant="secondary"
                onClick={() => setToggleAdd(!toggleAdd)}
              >
                {toggleAdd ? "Cancel" : "Add"}
              </Button>
            </div>
          </div>

          <div
            className="d-flex flex-column justify-content-between align-items-center my-5"
            fluid
          >
            {loading ? (
              <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
            ) : images ? (
              <Row>
                {images.map((image) => (
                  <Col className="m-3 p-2 image-card">
                    <div key={image.id}>
                      <div className="d-flex justify-content-end">
                        <span
                          onClick={() => setImageToUpdate(image)}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                          </svg>
                        </span>
                        <span
                          onClick={() => deleteImage(image.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        </span>
                      </div>

                      <div>
                        <img
                          src={image.url}
                          alt={image.title}
                          style={{
                            width: "200px",
                            cursor: "pointer",
                            height: "200px",
                          }}
                          onClick={() => openCarousel(image)}
                        ></img>
                        <p className="text-center">{image.title}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <h1>No images</h1>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default ImageList;
