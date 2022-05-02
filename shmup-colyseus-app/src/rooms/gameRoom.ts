import { Client, Room } from "colyseus";
import { PlayerData, Quat, Vect3} from "../entities"
import { GameState } from '../states/gameState';

class PlayerMovementInput {
    position: Vect3;
    rotation: Quat;
  }

export class GameRoom extends Room<GameState> {
    maxClients: number = 2;
    maxPlayerLives: number = 3;
    playersLives: Array<number>;
    playersPlaced: number = 0;
    playersCount: number = 0;
    gamePhase: string = 'waiting';

    // Called when the room is created
    onCreate(options: any)
    {
        console.log("room created!", options);
        this.reset();

        // Set client messages functions
        this.onMessage('playerMove', (client, input)=>this.onPlayerMove(client, input));
        // TODO:
            // Player Attacks
            // Enemy States
            // Power Up States
    }


    // Called when someone joins this room
    onJoin (client: Client) {
        console.log("client joined", client.sessionId);


        //player.sessionId = client.sessionId;
        //this.state.players[client.sessionId];
        
        let player: PlayerData = new PlayerData();
        player.playerId = client.sessionId;
        player.name = 'player' + this.playersCount+1
        player.lives = this.maxPlayerLives;
        player.position = new Vect3();
        player.score = 0;
        player.lastShootAt = 0;

        this.state.players.set(client.sessionId, player);
        this.playersCount++;
        this.playersPlaced++;

        if (this.playersCount == this.maxClients) {
            this.gamePhase = 'StartGame';
            this.lock();
        }
    }

    onLeave (client: Client) {
        console.log("client left", client.sessionId);
        this.state.players.delete(client.sessionId);
        this.playersPlaced--;
        this.playersCount--;
        this.unlock()
    }

    // Any message received from client
    // onMessage (client: any, message: any) {
    //     console.log("message received", message);
    //     if (!message) {return;}
    //     let player: PlayerData = this.state.players.get(client.sessionId);
    //     if (!player) {return;}
    //     let command: string = message['command'];

    //     switch (command) {

    //         case 'SetPlayer':

    //             console.log('Setting player: ' + client.sessionId);
    //             this.playersPlaced++;

    //             if (this.playersPlaced == 2) {
    //                 //TODO: Use this to check and start the game battle
    //                 this.gamePhase = 'battle';
    //                 this.unlock();
    //             }
    //             break;

    //         case 'MovePlayer':
    //             console.log('Move player'+ client.sessionId)
            
    //         case 'Shoot':
    //             console.log('Shooting lasers: ' + client.sessionId)

    //         case 'GameOver':
    //             if (this.playersCount == 0)
    //             {
    //                 this.reset()
    //             }
    //             break;

    //         default:
    //             console.log('unknown command: '+ client.sessionId);
    //     }
    // }

    onDispose () {
        console.log("Last Player left! Destroying this game room now!");
    }

    onPlayerMove(client:Client, playerMovement: PlayerMovementInput) {
        const player: PlayerData = this.state.players.get(client.sessionId);

        // Check if player had any displacement
        if (playerMovement.position.x != player.position.x ||
            playerMovement.position.y != player.position.y ||
            playerMovement.position.z != player.position.z
        ) {
          const pos: Vect3 = new Vect3();
          pos.x = playerMovement.position.x;
          pos.y = playerMovement.position.y;
          pos.z = playerMovement.position.z;
          player.position = pos;
        }
      }

    //Set this room clean state
    reset() {
        this.playersLives = new Array<number>();
        this.playersLives[0] = this.maxPlayerLives;
        this.playersLives[1] = this.maxPlayerLives;
        let state = new GameState();
        this.setState(state);
        this.playersPlaced = 0;
        this.playersCount = 0;
    }
}