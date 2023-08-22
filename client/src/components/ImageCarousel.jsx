import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardMedia, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageCarousel = ({
  images,
  removeImage,
  currentIndex,
  setCurrentIndex,
}) => {
  const handleChangeIndex = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(images.length - 1);
    }
  }, [currentIndex, images, setCurrentIndex]);

  return (
    <Carousel
      index={currentIndex}
      onChangeIndex={handleChangeIndex}
      autoPlay={false}
      sx={{ mt: 3, mb: 3, overflow: "visible" }}
    >
      {images.map((image, index) => (
        <Card key={index}>
          <CardMedia
            component="img"
            height="500"
            image={image}
            alt={`Image ${index}`}
          />
          <Box
            sx={{
              position: "absolute",
              top: "-25px",
              right: "-25px",
            }}
          >
            <IconButton onClick={() => removeImage(index)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
