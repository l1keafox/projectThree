class Bubble {
  constructor() {
    this.type = "bubble";
    this.r = Math.floor(Math.random() * 15) + 6; // the radius of the bubble
    this.x = Math.floor(Math.random() * 320);
    this.y = 480 + rollDice(2, 4); // make sure it starts off screen
    let rando = Math.floor(Math.random() * 5) + 1;
    this.speed = Math.floor(Math.random() * 7) + 0.05 * 0.001 + 0.2;
    this.hits = rando;
    this.score = rando;
  }
  update() {
    this.y -= this.speed;
  }
  render() {
    return "circle";
  }
}

let bubble = {
  next: 0, // when the next bubble is spawned.
  maxTimer: 40, // what next is set too when it hits 0
  group: [], // this is what holds the bubbles.
};

module.exports = {
  name: function () {
    return "bubbles";
  },
  init: function () {
    // this is empty
    io.on("connection", (socket) => {
      socket.on("click", (msg) => {
        let i = bubble.group.length;

        while (i--) {
          let bubb = bubble.group[i];
          if (
            distance(bubb.x + bubb.r, bubb.y + bubb.r, msg.x, msg.y) < bubb.r
          ) {
            bubb.hits--;
            const engine = require("../engine");
            if (bubb.hits <= 0) {
              // console.log(engine.sessionKey);
              let currentKey = engine.sessionKey;
              // console.log(currentKey[socket.id], currentKey);
              if(engine.sessionKey.length){
                console.log(engine.sessionKey.length);
                let result = engine.sessionKey.filter(player => player.sessionId === socket.id );
                if(result.length){
                    console.log(result[0]);
                }
              }

              // if (currentKey && currentKey[socket.id]) {
              //   if (currentKey[socket.id].points == undefined) {
              //     currentKey[socket.id].points = 0;
              //   }
              //   // Import model from graphQL
              //   // UserID currentKey[socket.id].id
              //   // id  - id via graphql
              //   // name - username in graphql
              //   // sessionID - uniqueID per socket.io session

              //   currentKey[socket.id].points += rollDice(1, 6);
              //   console.log(
              //     `point scored by: ${currentKey[socket.id].username} has now ${
              //       currentKey[socket.id].points
              //     }`
              //   );
              // }
              bubble.group.splice(i, 1);
            }
          }
        }
      });
    });
  },
  updateFrame: function () {
    const Engine = require("../engine");
    bubble.next--;
    if (bubble.next <= 0) {
      bubble.next = bubble.maxTimer;
      let newBubble = new Bubble();
      bubble.group.push(newBubble);
    }
    if (bubble.group.length === 0) {
      let randomCount = Math.floor(Math.random() * 15) + 10;
      while (randomCount--) {
        let newBubble = new Bubble();
        bubble.group.push(newBubble);
      }
    }

    let index = bubble.group.length;
    while (index--) {
      // we go backwards cause I want too :P But in seriously
      // when splicing an array going backwards prevents some issues of next in array
      let bubb = bubble.group[index];
      bubb.update();
      if (bubble.group[index].y <= -10) {
        bubble.group.splice(index, 1);
        break;
      }
    }
  },
  emitData: function () {
    return bubble.group;
  },
};
