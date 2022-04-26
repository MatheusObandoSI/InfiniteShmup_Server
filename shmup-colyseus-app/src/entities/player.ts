import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';

export class Player extends Schema{
    @type('string')
    public playerId: string;

    @type('string')
    public name: string;

    @type('number')
    public lives: number;

    @type('number')
    public xPos: number;

    @type('number')
    public yPos: number;

    @type('number')
    public score: number;

    // This property is needed to limit shooting rate
    public lastShootAt: number;

    // Init
    
    // constructor(
    //     playerId: string,
    //     x: number,
    //     y: number,
    //     lives: number,
    //     maxLives: number,
    //     name: string,
    // ) {
    //     super();
    //     this.playerId = playerId;
    //     this.lives = lives;
    //     this.maxLives = maxLives;
    //     this.name = validateName(name);
    //     this.kills = 0;
    //     this.lastShootAt = undefined;
    // }

    // Methods
    move(dirX: number, dirY: number, speed: number) {

        const speedX = dirX * (speed);
        const speedY = dirY * (speed);

        this.xPos += speedX;
        this.yPos += speedY;
    }

    damage() {
        this.lives -= 1;
    }

    shoot()
    {
        //TODO: Set lasers shooting logic
        console.log(this.playerId + " Shooting lasers")
    }


    canTakeDamage(otherPlayerId: string, team?: string): boolean {
        if (!this.isAlive) {
            return false;
        }

        if (this.playerId === otherPlayerId) {
            return false;
        }
        return true;
    }

    // Getters
    get isAlive(): boolean {
        return this.lives > 0;
    }

    get isFullLives(): boolean {
        return this.lives === 3;
    }

    // Setters
    setPosition(x: number, y: number) {
        this.xPos = x;
        this.yPos = y;
    }

    setLives(lives: number) {
        if (lives) {
            this.lives = lives;
            this.score = 0;
        } else {
            this.lives = 0;
        }
    }

    setName(name: string) {
        this.name = validateName(name);
    }

    setScore(score: number) {
        this.score = score;
    }
}

const validateName = (name: string) => name.trim().slice(0, 16);