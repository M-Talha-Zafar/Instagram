import { useUserContext } from "../contexts/UserContext";
import axiosInstance from "../utilities/axios";
import { useState } from "react";

export function userService() {
  const { user } = useUserContext();

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
        `/users/by-username/${username}`,
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

  const updateUser = async (editedUser, image) => {
    try {
      setUpdatingUser(true);
      const response = await axiosInstance.put(`/users/${user._id}`, {
        editedUser,
        image,
      });
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
        data,
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
        data,
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
        `/users/search?searchQuery=${searchQuery}`,
      );
      return response.data;
    } catch (ex) {
      console.error(ex);
    } finally {
      setSearching(false);
    }
  };

  return {
    getUserByUsername,
    updateUser,
    fetchStoryUsers,
    sendFollowRequest,
    addFollower,
    unfollowUser,
    cancelRequest,
    getRequests,
    searchUsers,
    getFollowOrFollowing,
    loadingUser,
    updatingUser,
    loadingStoryUsers,
    sendingRequest,
    addingFollower,
    unfollowingUser,
    cancellingRequest,
    loadingRequests,
    searching,
    loadingFoF,
  };
}
