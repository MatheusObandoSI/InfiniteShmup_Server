import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';

export class Quat extends Schema {
    @type('float32')
    x: number = 0;
  
    @type('float32')
    y: number = 0;
  
    @type('float32')
    z: number = 0;
  
    @type('float32')
    w: number = 1;
}