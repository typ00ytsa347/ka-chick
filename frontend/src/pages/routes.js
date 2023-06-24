const ABS_PATHS = {
  MENU: "/",

  MAP_CREATOR: "/map/setup",
  MAP_IMG_UPLOAD: "/map/upload",
  MAP_OBJECTIVES: "/map/objectives",
  MAP_EDIT_OBJECTIVE: "/map/objectives/:id",
  
  CREATE_LOBBY: "/lobby/create",
  JOIN_LOBBY: "/lobby/join",
  SETUP_LOBBY: "/lobby/:id/setup",
  LOBBY: "/lobby/:id",

  GAME: "/game/:id",
  OBJECTIVE: "/game/:id/:objective",
  GAME_END: "/game/:id/end",
  LEADERBOARD: "/game/:id/leaderboard"
}

export default ABS_PATHS;