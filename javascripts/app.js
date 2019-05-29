// Rover Object Goes Here
// ======================

var roverList = [];

var marsGrid = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, "O", null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, "O", null, null, null, null, null, null],
  [null, null, null, null, "O", null, null, null, null, null],
  [null, null, null, null, null, "O", null, null, null, null],
  [null, null, null, null, null, null, "O", null, null, null],
  [null, null, null, null, null, null, null, "O", null, null],
  [null, null, null, null, null, null, null, null, "O", null]
];

// ======================

function turnOn(roverName, roverDirection = "N", roverX = 0, roverY = 0) {
  if (!roverName) {
    console.log("Can't turn on rover: it needs a name.");
    return;
  }

  for (var i = 0; i < roverList.length; i++) {
    if (roverList[i].name === roverName) {
      console.log("'" + roverName + "' is already on'.");
      return;
    }
  }

  if (
    roverDirection != "N" &&
    roverDirection != "E" &&
    roverDirection != "S" &&
    roverDirection != "W"
  ) {
    console.log(
      "Can't turn on '" + roverName + "': the direction is not valid."
    );
    return;
  }

  if (!positionIsInLimits(roverX, roverY)) {
    console.log(
      "Can't turn on '" + roverName + "': initial position is out of limits."
    );
    return;
  }

  if (positionIsObstacle(roverX, roverY)) {
    console.log(
      "Can't turn on '" + roverName + "': initial position has an obstacle."
    );
    return;
  }

  var occupant = positionIsOccupied(roverX, roverY);
  if (occupant) {
    console.log(
      "Can't turn on '" +
        roverName +
        "': '" +
        occupant +
        "' is already at the initial position."
    );
    return;
  }

  var rover = {
    name: roverName,
    direction: roverDirection,
    x: roverX,
    y: roverY,
    travelLog: [[roverX, roverY]]
  };

  roverList.push(rover);
  console.log("'" + rover.name + "' is now on.");
}

function turnOff(roverName){
  if (!roverName) {
    console.log("Can't turn of rover: no name provided.");
    return;
  }

  for (var i = 0; i < roverList.length; i++) {
    if (roverList[i].name === roverName) {
      roverList.splice(i);
      console.log("'" + roverName + "' is now off'.");
      return;
    }
  }

  console.log(
    "Can't turn off '" +
      roverName +
      "': we can't find it."
  );
}

function turnLeft(rover) {
  let newDirection;

  switch (rover.direction) {
    case "N":
      newDirection = "W";
      break;
    case "W":
      newDirection = "S";
      break;
    case "S":
      newDirection = "E";
      break;
    case "E":
      newDirection = "N";
      break;
  }

  rover.direction = newDirection;

  console.log("'" + rover.name + "' turns left to '" + newDirection + "'.");
}

function turnRight(rover) {
  let newDirection;

  switch (rover.direction) {
    case "N":
      newDirection = "E";
      break;
    case "E":
      newDirection = "S";
      break;
    case "S":
      newDirection = "W";
      break;
    case "W":
      newDirection = "N";
      break;
  }

  rover.direction = newDirection;

  console.log("'" + rover.name + "' turns right to '" + newDirection + "'.");
}

function moveForward(rover) {
  let newX, newY;
  switch (rover.direction) {
    case "N":
      newX = rover.x;
      newY = rover.y - 1;
      break;

    case "E":
      newX = rover.x + 1;
      newY = rover.y;
      break;

    case "S":
      newX = rover.x;
      newY = rover.y + 1;
      break;

    case "W":
      newX = rover.x - 1;
      newY = rover.y;
      break;
  }

  if (!positionIsInLimits(newX, newY)) {
    console.log(
      "'" +
        rover.name +
        "' can't move forward to position (" +
        newX +
        ", " +
        newY +
        "): it's out of limits."
    );
    return;
  }
  if (positionIsObstacle(newX, newY)) {
    console.log(
      "'" +
        rover.name +
        "' can't move forward to position (" +
        newX +
        ", " +
        newY +
        "): there's an obstacle on the way."
    );
    return;
  }

  var occupant = positionIsOccupied(newX, newY);
  if (occupant) {
    console.log(
      "'" +
        rover.name +
        "' can't move forward to position (" +
        newX +
        ", " +
        newY +
        "): '" +
        occupant +
        "' is on the way."
    );
    return;
  }

  rover.x = newX;
  rover.y = newY;
  rover.travelLog.push([rover.x, rover.y]);
  console.log(
    "'" +
      rover.name +
      "' moves forward to position (" +
      newX +
      ", " +
      newY +
      ")."
  );
}

function moveBackward(rover) {
  let newX, newY;
  switch (rover.direction) {
    case "N":
      newX = rover.x;
      newY = rover.y + 1;
      break;

    case "E":
      newX = rover.x - 1;
      newY = rover.y;
      break;

    case "S":
      newX = rover.x;
      newY = rover.y - 1;
      break;

    case "W":
      newX = rover.x + 1;
      newY = rover.y;
      break;
  }

  if (!positionIsInLimits(newX, newY)) {
    console.log(
      "'" +
        rover.name +
        "' can't move backward to position (" +
        newX +
        ", " +
        newY +
        "): it's out of limits."
    );
    return;
  }
  if (positionIsObstacle(newX, newY)) {
    console.log(
      "'" +
        rover.name +
        "' can't move backward to position (" +
        newX +
        ", " +
        newY +
        "): there's an obstacle on the way."
    );
    return;
  }

  var occupant = positionIsOccupied(newX, newY);
  if (occupant) {
    console.log(
      "'" +
        rover.name +
        "' can't move backward to position (" +
        newX +
        ", " +
        newY +
        "): '" +
        occupant +
        "' is on the way."
    );
    return;
  }

  rover.x = newX;
  rover.y = newY;
  rover.travelLog.push([rover.x, rover.y]);
  console.log(
    "'" +
      rover.name +
      "' moves backward to position (" +
      newX +
      ", " +
      newY +
      ")."
  );
}

function moveRover(commands) {
  if (roverList.length > 0) {
    for (var i = 0; i < commands.length; i++) {
      var rover = roverList[i % roverList.length];
      switch (commands[i]) {
        case "r":
          turnRight(rover);
          break;
        case "l":
          turnLeft(rover);
          break;
        case "f":
          moveForward(rover);
          break;
        case "b":
          moveBackward(rover);
          break;
      }
    }
    for (var i = 0; i < roverList.length; i++) {
      printTravelLog(roverList[i]);
    }
  } else {
    console.log("Can't move any rovers: there are none defined.");
  }
}

function printTravelLog(rover) {
  console.log(
    "'" +
      rover.name +
      "' is heading '" +
      rover.direction +
      "'. This is its travel log:"
  );
  for (var i = 0; i < rover.travelLog.length; i++) {
    console.log("   Position: " + rover.travelLog[i]);
  }
}

function positionIsInLimits(x, y) {
  if (typeof marsGrid[x] === "undefined" || typeof marsGrid[x][y] === "undefined") {
    return false;
  }
  return true;
}

function positionIsObstacle(x, y) {
  if (marsGrid[x][y] === "O") {
    return true;
  }

  return false;
}

function positionIsOccupied(x, y) {
  for (var i = 0; i < roverList.length; i++) {
    if (roverList[i].x === x && roverList[i].y === y) {
      return roverList[i].name;
    }
  }

  return "";
}
