import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';
import { EntityData } from './entityData';

export class BulletData extends EntityData {

    @type('string')
    public playerId: string;

}
