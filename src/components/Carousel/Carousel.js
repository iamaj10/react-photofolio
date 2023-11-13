import React from "react";
import Carousel from "better-react-carousel";

function CarouselComp({ image, onClose, images }) {
  // Filter out the selected image from the images array
  const restOfImages = images.filter((img) => img.id !== image.id);
  const allImages = [image, ...restOfImages];

  return (
    <>
      <div
        className="d-flex justify-content-end my-2"
        style={{ cursor: "pointer" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
          onClick={onClose}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      </div>

      <div className="d-flex justify-content-center">
        <Carousel cols={1} rows={1} gap={10} loop>
          {allImages.map((img) => (
            <Carousel.Item>
              <img width="100%" height="60%" src={img.url} alt={img.title} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default CarouselComp;
