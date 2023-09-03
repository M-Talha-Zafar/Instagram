import { useUserContext } from "../contexts/UserContext";
import axiosInstance from "../utilities/axios";
import { useState } from "react";

export function postService() {
  const { user } = useUserContext();

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

  return {
    getPosts,
    getPostById,
    fetchFeed,
    deletePost,
    likePost,
    unlikePost,
    updatePost,
    createPost,
    loadingPosts,
    loadingPost,
    loadingFeed,
    creatingPost,
    deletingPost,
    likingPost,
    unlikingPost,
    updatingPost,
  };
}
