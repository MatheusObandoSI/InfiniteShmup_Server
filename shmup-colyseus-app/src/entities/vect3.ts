import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';

export class Vect3 extends Schema {
    @type('float32')
    x: number = 0;
  
    @type('float32')
    y: number = 0;
  
    @type('float32')
    z: number = 0;
}
