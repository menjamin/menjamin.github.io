startPage("lobby");
window.onload = function () {
    var players = [];
    players[1] = {};
    players[2] = {}
    players[1].connected = false;
    players[2].connected = false;
    players[1].ready = false;
    players[2].ready = false;
    var gameOn = false;

    cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    /* console.log('starting the receiver application'); */
    window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:chrometron.menjamin.chrometron');

    castReceiverManager.onReady = function (event) {
        /* console.log('receiver application is ready'); */
    };

    castReceiverManager.onSenderConnected = function (event) {
        /* console.log(window.castReceiverManager.getSender(event.data).userAgent); */
    };

    castReceiverManager.onSenderDisconnected = function (event) {
        console.log('sender application disconnected: ' + event.data);
        if (!gameOn && window.castReceiverManager.getSenders().length == 0) {
            window.close();
        }
    };

    // initialize the CastReceiverManager
    window.castReceiverManager.start({ statusText: 'Application is starting' });
   /*  console.log('Receiver Manager started'); */


    window.messageBus.onMessage = function (message) {
        
        //Disconnect Commands
        if (message.data === 'disc1' || message.data === 'disc2') {
            var player = message.data.substr(4, 1);
            $('#player' + player).toggleClass("grey", true);
            players[player].connected = false;
            players[player].ready = false;

            if (!players[1].connected || !players[2].connected) {
                document.getElementById("infoLobby").innerHTML = "Waiting for two players to connect their android devices";
            }
        }

        if (message.data === 'exitAll') {
            window.messageBus.broadcast("exit");
            window.close();
        }

        if (gameOn === false) {

            //If the players are ready
            if (message.data === 'ready1' || message.data === 'ready2') {
                if (message.data === 'ready1') {
                    players[1].ready = true;
                }
                else if (message.data === 'ready2') {
                    players[2].ready = true;
                }

                else if (players[1].ready && players[2].ready) {
                    runGame();
                }

            }

            else if (message.data == 'notReady1') {
                players[1].ready = false;
            }

            else if (message.data == 'notReady2') {
                players[2].ready = false;
            }

            //No player connected
            if (players[1].connected === false && players[2].connected === false) {
                playerConnected(1, message);
                document.getElementById("player1Text").innerHTML = "Player1 Connected";
            }

            //Player2 not connected
            else if (players[1].connected && !players[2].connected) {
                playerConnected(2, message);
                document.getElementById("player2Text").innerHTML = "Player2 Connected";
            }

            //Player1 not connected
            else if (players[2].connected && !players[1].connected) {
                playerConnected(1, message);
            }


            //BOTH PLAYERS READY
            else if (players[1].ready === true && players[2].ready === true) {
                runGame();
            }
        }

        else {

            if (message.senderId === players[1].senderID && message.data === 'up') {
                player1turnUp();
            }

            else if (message.senderId === players[1].senderID && message.data === 'down') {
                player1turnDown();
            }

            else if (message.senderId === players[1].senderID && message.data === 'left') {
                player1turnLeft();
            }

            else if (message.senderId === players[1].senderID && message.data === 'right') {
                player1turnRight();
            }
            else if (message.senderId === players[2].senderID && message.data === 'up') {
                player2turnUp();
            }

            else if (message.senderId === players[2].senderID && message.data === 'down') {
                player2turnDown();
            }

            else if (message.senderId === players[2].senderID && message.data === 'left') {
                player2turnLeft();
            }

            else if (message.senderId === players[2].senderID && message.data === 'right') {
                player2turnRight();
            }
            else if (message.senderId === players[2].senderID && message.data === 'paus' || message.senderId === players[1].senderID && message.data === 'paus') {
                togglePause();
            }
        }
    }

    function playerConnected(whatPlayer, isPlayerOnline) {
        var thePlayer = '#player' + whatPlayer;

        if (isPlayerOnline.data === 'true') {

            players[whatPlayer].connected = Boolean('true');
            $(thePlayer).toggleClass("grey", false);
            players[whatPlayer].senderID = isPlayerOnline.senderId;
            window.messageBus.send(players[whatPlayer].senderID, "Player" + whatPlayer);
        }
        else if (isPlayerOnline.data === 'false') {
            $(thePlayer).toggleClass("grey", true);
            players[whatPlayer].connected = Boolean('false');
        }

        if (players[1].connected && players[2].connected) {
            document.getElementById("infoLobby").innerHTML = "Two cool players are connected. Press ready when you are ready to battle";
        }

    };

    function runGame() {
        startPage('game');
        gameOn = true;
        window.messageBus.send(players[1].senderID, "game");
        window.messageBus.send(players[2].senderID, "game");

    };

    function sendToAllSenders(message) {
        window.messageBus.broadcast("Broadcast message is working");
    }

};
