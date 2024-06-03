export const renderGame = (gameData) => {
  let map = document.querySelector(".map");
  if (!map) {
    map = document.createElement("div");
    map.className = "map";
    map.style.width = gameData.map.width + "px";
    map.style.height = gameData.map.height + "px";
    map.style.borderRadius = gameData.map.shape === "circle" ? "50%" : "0";
    map.style.backgroundColor = gameData.map.bgcolor;
    document.body.appendChild(map);
  }
  gameData.players.forEach((player, index) => {
    let playerElement = document.querySelector(`#${player.id}`);
    if (playerElement) {
      playerElement.style.left = player.x + "px";
      playerElement.style.top = player.y + "px";
    } else {
      playerElement = document.createElement("div");
      playerElement.id = player.id;
      playerElement.className = "globulo";
      playerElement.style.width = player.size + "px";
      playerElement.style.height = player.size + "px";
      playerElement.style.backgroundColor = player.color;
      playerElement.style.left = player.x + "px";
      playerElement.style.top = player.y + "px";
      map.appendChild(playerElement);
    }
  });
};
