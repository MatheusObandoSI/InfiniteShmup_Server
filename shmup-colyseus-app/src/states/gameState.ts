import {Player} from "../entities"
import {Schema, type, MapSchema, ArraySchema} from "@colyseus/schema"

export class GameState extends Schema
{
    @type({map: Player})
    // players: MapSchema<Player> = new MapSchema<Player>();
    players: MapSchema<Player> = new MapSchema<Player>();

    @type("string")
    phase: String = "Waiting";
    
}