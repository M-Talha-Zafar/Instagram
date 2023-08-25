const isResourceOwner = async (req, res, next) => {
  const resourceId = req.params.id; // Extract the resource ID from the request parameters
  const userId = req.user._id; // Assuming you store user information in req.user after authentication

  try {
    // Fetch the resource from the database
    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (resource.owner.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // If the user is the owner, proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
