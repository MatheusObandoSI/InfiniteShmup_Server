import {PlayerData, EnemyData, BulletData} from "../entities"
import {Schema, type, MapSchema, ArraySchema} from "@colyseus/schema"

export class GameState extends Schema
{
    @type({map: PlayerData})
    players: MapSchema<PlayerData> = new MapSchema<PlayerData>();

    //TODO: Add other entities
}