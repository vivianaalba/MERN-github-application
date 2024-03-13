import express from "express";

const router = express.Router();

// fetch the other user’s profile and their repos
router.get("/profile/:username", getUserProfileAndRepos);
// check that the current user is authenticated and pull their likes
router.get("/likes", ensureAuthenticated, getLikes);
// check that the current user is authenticated, then pull the other user from the current user’s liked profiles
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;