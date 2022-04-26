import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';

export class Enemy extends Schema{
    @type('string')
    public enemyId: string;

    @type('string')
    public enemyType: string;

    @type('number')
    public points: number;

    @type('number')
    public lives: number;

    @type('number')
    public x: number;

    @type('number')
    public y: number;

    @type('number')
    public rotation: number;

    // Methods
    move(dirX: number, dirY: number, speed: number) {

        const speedX = dirX * (speed);
        const speedY = dirY * (speed);

        this.x += speedX;
        this.y += speedY;
    }

    damage() {
        this.lives -= 1;
    }

    get isAlive(): boolean {
        return this.lives > 0;
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
