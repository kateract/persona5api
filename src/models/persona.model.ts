import {Entity, model, property, hasOne} from '@loopback/repository';
import {DamageEffectiveness} from './damage-effectiveness.model';

@model({settings: {strict: false, validateUpsert: true, idInjection: true}})
export class Persona extends Entity {
  @property({
    type: 'number',
    id: 1,
    generated: true,
    updateOnly: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  codeName?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  arcana?: string;

  @hasOne(() => DamageEffectiveness)
  damageEffectiveness: DamageEffectiveness;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here

}

export type PersonaWithRelations = Persona & PersonaRelations;
