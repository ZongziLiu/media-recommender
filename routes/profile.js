const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/my-profile", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
      userData = req.session.userData;

      // initializing user playlists to show on the profile
      userPlaylists = [];

      //Favorites are names of movies or songs, not playlists
      //const favPlayListTmpObj = await data.playlists.getPlaylistById(userData.Favorites)


      const watchLaterPlayListTmpObj = await data.playlists.getPlaylistById(userData.WatchLater)
      //userPlaylists.push(favPlayListTmpObj);
      userPlaylists.push(watchLaterPlayListTmpObj);

      // generating the recommendation
      const recommendedSong = await data.recommender.getRecommendedMusic(userData.FavoriteMusicGenres)


    res.render("profile", {
      userData: req.session.userData,
      userPlaylists: userPlaylists,
      recommendedSong: recommendedSong,
      isLoggedInUserProfile: true
    });
  }
});

router.get("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
        const selectedUser = await data.users.getUserById(req.params.id);
      res.render("profile", {
        userData: selectedUser,
        isLoggedInUserProfile: false
      });
    }
  });

module.exports = router;
