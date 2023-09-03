import axiosInstance from "../utilities/axios";
import { useState } from "react";

export function storyService() {
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
    createStory,
    getStories,
    deleteStory,
    creatingStory,
    loadingStories,
    deletingStory,
  };
}
