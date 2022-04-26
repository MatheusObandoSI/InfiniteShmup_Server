import { Client, Room } from "colyseus";
import { Player, } from "../entities"
import { GameState } from '../states/gameState';

export class GameRoom extends Room<GameState> {
    maxClients: number = 2;
    maxPlayerHealth: number = 3;
    playerHealth: Array<number>;
    playersPlaced: number = 0;
    playerCount: number = 0;

    // Called when the room is created
    onInit (options: any) {
        console.log("room created!", options);
        this.reset();
    }

    // Called when someone joins this room
    onJoin (client: Client) {
        console.log("client joined", client.sessionId);

        //player.sessionId = client.sessionId;
        //this.state.players[client.sessionId];
        let player: Player = new Player();
        player.playerId = client.sessionId;
        player.name = 'player'+this.playerCount+1
        player.lives = this.maxPlayerHealth;
        player.setPosition(0,0);
        player.score = 0; 

        this.state.players.set(client.sessionId, player);
        this.playerCount++;
        this.playersPlaced++;

        if (this.playerCount == 2) {
            this.state.phase = 'place';
            this.lock();
        }
    }

    //Called when someone leaves this room
    onLeave (client: Client) {
        console.log("client left", client.sessionId);

        this.state.players.delete(client.sessionId);
        this.playersPlaced--;
        this.playerCount--;
    }


    // Any message received from client
    onMessage (client: any, message: any) {
        console.log("message received", message);
        if (!message) {return;}
        let player: Player = this.state.players.get(client.sessionId);
        if (!player) {return;}
        let command: string = message['command'];

        switch (command) {

            case 'SetPlayer':

                console.log('Setting player: ' + client.sessionId);
                this.playersPlaced++;

                if (this.playersPlaced == 2) {
                    this.state.phase = 'battle';
                }
                break;

            case 'MovePlayer':
                console.log('Move player'+ client.sessionId)
            
            case 'Shoot':
                console.log('Shooting lasers: ' + client.sessionId)

            case 'GameOver':
                if (this.playerCount == 0)
                {
                    this.reset()
                }
                break;

            default:
                console.log('unknown command: '+ client.sessionId);
        }
    }

    onDispose () {
        console.log("Room destroyed!");
    }

    reset() {
        this.playerHealth = new Array<number>();
        this.playerHealth[0] = this.maxPlayerHealth;
        this.playerHealth[1] = this.maxPlayerHealth;

        let state = new GameState();

        this.setState(state);
        this.playersPlaced = 0;
    }
}