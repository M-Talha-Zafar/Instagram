import Carousel from "react-material-ui-carousel";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

const PostCard = ({
  post,
  height,
  displayAvatar,
  displayCaption,
  displayComments,
}) => {
  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      {displayAvatar && post && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ cursor: "pointer" }}
            onClick={() => {
              console.log("Redirect to user");
            }}
            src={post.user.profilePicture}
            alt={post.user.username}
          />
          <Typography
            sx={{ marginLeft: "1rem", cursor: "pointer" }}
            onClick={() => {
              console.log("Redirect to user");
            }}
          >
            {post.user.username}
          </Typography>
        </Box>
      )}

      <Carousel autoPlay={false} sx={{ mt: 3, mb: 3, overflow: "visible" }}>
        {post.images.map((image, index) => (
          <Card key={index}>
            <CardMedia
              component="img"
              height={height}
              image={image}
              alt={`Image ${index}`}
            />
          </Card>
        ))}
      </Carousel>
      {displayCaption && post && (
        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="subtitle1">
            <b>{post.user.username}</b> {post.caption}
          </Typography>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        {displayComments &&
          (post.comments.length > 0 ? (
            <Box>
              <Divider orientation="horizontal" />
              {post &&
                post.comments.map((comment) => (
                  <Box
                    key={comment._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <Avatar
                      src={comment.user.profilePicture}
                      alt={comment.user.username}
                    />
                    <Box sx={{ marginLeft: "1rem" }}>
                      <Typography variant="subtitle1">
                        <b>{comment.user.username}</b>
                      </Typography>
                      <Typography>{comment.text}</Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          ) : (
            <Typography variant="subtitle1" align="center">
              {" "}
              No comments
            </Typography>
          ))}
      </Box>
    </Paper>
  );
};

export default PostCard;
