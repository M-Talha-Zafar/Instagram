import { useUserContext } from "../contexts/UserContext";
import axiosInstance from "../utilities/api";
import { useState } from "react";

export function useApiCall() {
  const { user } = useUserContext();

  // Posts
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const [likingPost, setLikingPost] = useState(false);
  const [unlikingPost, setUnlikingPost] = useState(false);
  const [updatingPost, setUpdatingPost] = useState(false);

  const getPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await axiosInstance.get("/posts");
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoadingPosts(false);
    }
  };

  const getPostById = async (id) => {
    try {
      setLoadingPost(true);
      const response = await axiosInstance.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoadingPost(false);
    }
  };

  const fetchFeed = async () => {
    try {
      setLoadingFeed(true);
      const response = await axiosInstance.get(`/posts/by-user/${user._id}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoadingFeed(false);
    }
  };

  const createPost = async (data) => {
    try {
      setCreatingPost(true);
      const response = await axiosInstance.post("/posts", data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setCreatingPost(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      setDeletingPost(true);
      const response = await axiosInstance.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setDeletingPost(false);
    }
  };

  const likePost = async (userId, postId) => {
    try {
      setLikingPost(true);
      const response = await axiosInstance.post(`/posts/like`, {
        userId,
        postId,
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLikingPost(false);
    }
  };

  const unlikePost = async (userId, postId) => {
    try {
      setUnlikingPost(true);
      const response = await axiosInstance.post(`/posts/unlike`, {
        userId,
        postId,
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setUnlikingPost(false);
    }
  };

  const updatePost = async (postId, caption) => {
    try {
      setUpdatingPost(true);
      const response = await axiosInstance.put(`/posts/${postId}`, { caption });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setUpdatingPost(false);
    }
  };

  // Users
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingFoF, setLoadingFoF] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [loadingStoryUsers, setLoadingStoryUsers] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [addingFollower, setAddingFollower] = useState(false);
  const [unfollowingUser, setUnfollowingUser] = useState(false);
  const [cancellingRequest, setCancellingRequest] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [searching, setSearching] = useState(false);

  const getUserByUsername = async (username) => {
    try {
      setLoadingUser(true);
      const response = await axiosInstance.get(
        `/users/by-username/${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoadingUser(false);
    }
  };

  const getFollowOrFollowing = async (context, userId) => {
    try {
      setLoadingFoF(true);
      const response = await axiosInstance.get(`/users/${context}/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoadingFoF(false);
    }
  };

  const updateUser = async (data) => {
    try {
      setUpdatingUser(true);
      const response = await axiosInstance.put(`/users/${user._id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setUpdatingUser(false);
    }
  };

  const fetchStoryUsers = async () => {
    try {
      setLoadingStoryUsers(true);
      const response = await axiosInstance.get(`/users/stories/${user._id}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoadingStoryUsers(false);
    }
  };

  const sendFollowRequest = async (data) => {
    try {
      setSendingRequest(true);
      const response = await axiosInstance.post(
        "/users/send-follow-request",
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setSendingRequest(false);
    }
  };

  const addFollower = async (data) => {
    try {
      setAddingFollower(true);
      const response = await axiosInstance.post("/users/add-follower", data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setAddingFollower(false);
    }
  };

  const unfollowUser = async (data) => {
    try {
      setUnfollowingUser(true);
      const response = await axiosInstance.post("/users/unfollow-user", data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setUnfollowingUser(false);
    }
  };

  const cancelRequest = async (data) => {
    try {
      setCancellingRequest(true);
      const response = await axiosInstance.post(
        "/users/delete-follow-request",
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setCancellingRequest(false);
    }
  };

  const getRequests = async () => {
    try {
      setLoadingRequests(true);
      const response = await axiosInstance.get(`/users/requests/${user._id}`);
      return response.data;
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoadingRequests(false);
    }
  };

  const searchUsers = async (searchQuery) => {
    try {
      setSearching(true);
      const response = await axiosInstance.get(
        `/users/search?searchQuery=${searchQuery}`
      );
      return response.data;
    } catch (ex) {
      console.error(ex);
    } finally {
      setSearching(false);
    }
  };

  // Comments

  const [creatingComment, setCreatingComment] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);
  const [updatingComment, setUpdatingComment] = useState(false);

  const createComment = async (postId, data) => {
    try {
      setCreatingComment(true);
      const response = await axiosInstance.post(`/comments/${postId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setCreatingComment(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      setDeletingComment(true);
      const response = await axiosInstance.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setDeletingComment(false);
    }
  };

  const updateComment = async (commentId, text) => {
    try {
      setUpdatingComment(true);
      const response = await axiosInstance.put(`/comments/${commentId}`, {
        text,
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setUpdatingComment(false);
    }
  };

  // Stories

  const [creatingStory, setCreatingStory] = useState(false);
  const [loadingStories, setLoadingStories] = useState(false);
  const [deletingStory, setDeletingStory] = useState(false);

  const createStory = async (data) => {
    try {
      setCreatingStory(true);
      const response = await axiosInstance.post("/stories", data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setCreatingStory(false);
    }
  };

  const getStories = async (userId) => {
    try {
      setLoadingStories(true);
      const response = await axiosInstance.get(`/stories/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoadingStories(false);
    }
  };

  const deleteStory = async (storyId) => {
    try {
      setDeletingStory(true);
      const response = await axiosInstance.delete(`/stories/${storyId}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setDeletingStory(false);
    }
  };

  return {
    getPosts,
    getPostById,
    fetchFeed,
    deletePost,
    likePost,
    unlikePost,
    updatePost,
    getUserByUsername,
    createPost,
    updateUser,
    fetchStoryUsers,
    createComment,
    sendFollowRequest,
    addFollower,
    unfollowUser,
    cancelRequest,
    getRequests,
    searchUsers,
    getFollowOrFollowing,
    deleteComment,
    updateComment,
    createStory,
    getStories,
    deleteStory,
    loadingPosts,
    loadingPost,
    loadingFeed,
    creatingPost,
    deletingPost,
    likingPost,
    unlikingPost,
    updatingPost,
    loadingUser,
    updatingUser,
    loadingStoryUsers,
    creatingComment,
    sendingRequest,
    addingFollower,
    unfollowingUser,
    cancellingRequest,
    loadingRequests,
    searching,
    deletingComment,
    updatingComment,
    creatingStory,
    loadingFoF,
    loadingStories,
    deletingStory,
  };
}
