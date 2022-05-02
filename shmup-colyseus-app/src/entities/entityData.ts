import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';
import { Vect3 } from './vect3';
import { Quat } from './quat';

export class EntityData extends Schema {
    @type(Vect3)
    position = new Vect3();
  
    @type(Quat)
    rotation = new Quat();
}