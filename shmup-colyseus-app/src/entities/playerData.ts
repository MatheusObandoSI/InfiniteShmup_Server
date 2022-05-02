import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';
import { EntityData } from './entityData';
import { Vect3 } from './vect3';

export class PlayerData extends EntityData{

    @type('string')
    public playerId: string;

    @type('string')
    public name: string;

    @type('number')
    public lives: number;

    @type('number')
    public score: number;

    // This property is needed to limit shooting rate
    public lastShootAt: number;

    shoot()
    {
        //TODO: Set lasers shooting logic
        console.log(this.playerId + " Shooting lasers")
    }

    // Getters
    get isAlive(): boolean 
    {
        return this.lives > 0;
    }

    get isFullLives(): boolean 
    {
        return this.lives == 3;
    }

    // // Setters
    // setPosition(position: Vect3) 
    // {
    //     this.position = position;
    // }

    // setLives(lives: number) 
    // {
    //     if (lives) 
    //     {
    //         this.lives = lives;
    //         this.score = 0;
    //     } 
    //     else {
    //         this.lives = 0;
    //     }
    // }

    // setName(name: string) 
    // {
    //     this.name = validateName(name);
    // }

}

const validateName = (name: string) => name.trim().slice(0, 30);