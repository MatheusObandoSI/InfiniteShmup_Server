import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';
import { EntityData } from './entityData';

export class EnemyData extends EntityData {
    @type('string')
    public enemyId: string;

    @type('string')
    public enemyType: string;

    @type('number')
    public points: number;

    @type('number')
    public lives: number;
}
