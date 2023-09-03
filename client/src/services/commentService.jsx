import axiosInstance from "../utilities/axios";
import { useState } from "react";

export function commentService() {
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

  return {
    createComment,
    deleteComment,
    updateComment,
    creatingComment,
    deletingComment,
    updatingComment,
  };
}
