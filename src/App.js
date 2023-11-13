import { useState, useReducer, useEffect } from "react";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseinit";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlbumList from "./components/AlbumList/AlbumList";
import ImageList from "./components/ImageList/ImageList";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/Navbar";

import { Container, Row, Col } from "react-bootstrap";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_ALBUMS": {
      return {
        albums: payload.albums,
      };
    }
    case "GET_IMAGES": {
      return {
        albums: state.albums,
        images: payload.images,
      };
    }
    case "ADD_ALBUM": {
      return {
        albums: [state.albums],
      };
    }
    case "ADD_IMAGES": {
      return {
        albums: state.albums,
        images: [state.images],
      };
    }
    case "UPDATE_IMAGE": {
      const imagesDuplicate = state.images;
      imagesDuplicate[payload.ImagePos] = payload.image;
      return {
        albums: state.albums,
        images: imagesDuplicate,
      };
    }
    case "REMOVE_IMAGE": {
      return {
        albums: state.albums,
        images: state.images.filter((image) => image.id !== payload.id),
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { albums: [], images: [] });

  const [loading, setLoading] = useState(false);

  const [pageTitle, setPageTitle] = useState("Albums");

  const [albumIDToShow, setAlbumIDToShow] = useState();

  const [ImageToUpdate, setImageToUpdate] = useState(null);

  // console.log("state", state);

  const getDataAlbums = async () => {
    setLoading(true);

    const unsub = onSnapshot(collection(db, "Albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "GET_ALBUMS", payload: { albums } });
      // toast.success("Albums retrived successfully.");
    });
    setLoading(false);
  };

  const getDataImages = async (id) => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, `Albums/${id}/Images`),
      (snapshot) => {
        const images = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "GET_IMAGES", payload: { images } });
        // toast.success("Images retrived successfully.");
      }
    );
    setLoading(false);
  };

  const addAlbum = async (album) => {
    setLoading(true);
    const albumRef = collection(db, "Albums");
    const docRef = await addDoc(albumRef, album);

    dispatch({
      type: "ADD_ALBUM",
      payload: { album: { id: docRef.id, ...album } },
    });
    toast.success("Album added successfully.");
    setLoading(false);
  };

  const addImage = async (image) => {
    setLoading(true);
    const ImageRef = collection(db, `Albums/${albumIDToShow}/Images`);
    const docRef = await addDoc(ImageRef, image);

    dispatch({
      type: "ADD_IMAGE",
      payload: { image: { id: docRef.id, ...image } },
    });
    toast.success("Image added successfully.");
    setLoading(false);
  };

  const resetImageToUpdate = () => {
    setImageToUpdate(null);
  };

  const updateImage = async (image) => {
    setLoading(true);
    const ImagePos = state.images
      .map(function (img) {
        return img.id;
      })
      .indexOf(image.id);

    if (ImagePos === -1) {
      return false;
    }

    const ImageRef = doc(db, `Albums/${albumIDToShow}/Images`, image.id);
    await setDoc(ImageRef, image);

    dispatch({ type: "UPDATE_IMAGE", payload: { ImagePos, image } });
    toast.success("Image updated successfully.");
    setLoading(false);
  };

  const deleteImage = async (id) => {
    setLoading(true);
    // delete expense from firestore here
    await deleteDoc(doc(db, `Albums/${albumIDToShow}/Images`, id));

    dispatch({ type: "REMOVE_IMAGE", payload: { id } });
    toast.success("Image deleted successfully.");
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Container fluid style={{ backgroundColor: "#f5f5f5", width: "100%" }}>
        <Row>
          <Col xs={12}>
            {pageTitle === "Albums" ? (
              <AlbumList
                albums={state.albums}
                setPageTitle={setPageTitle}
                getData={getDataAlbums}
                setAlbumIDToShow={setAlbumIDToShow}
                loading={loading}
                addAlbum={addAlbum}
              />
            ) : (
              <ImageList
                albumID={albumIDToShow}
                albumTitle={
                  state.albums.find((album) => album.id === albumIDToShow).title
                }
                getData={getDataImages}
                images={state.images}
                loading={loading}
                setPageTitle={setPageTitle}
                addImage={addImage}
                ImageToUpdate={ImageToUpdate}
                resetImageToUpdate={resetImageToUpdate}
                updateImage={updateImage}
                setImageToUpdate={setImageToUpdate}
                deleteImage={deleteImage}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
