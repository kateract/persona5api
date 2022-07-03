import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false, validateUpsert: true, idInjection: true}})
export class DamageEffectiveness extends Entity {
  @property({
    type: 'number',
    id: 1,
    generated: true,
    updateOnly: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  physical?: string;

  @property({
    type: 'string',
  })
  gun?: string;

  @property({
    type: 'string',
  })
  fire?: string;

  @property({
    type: 'string',
  })
  ice?: string;

  @property({
    type: 'string',
  })
  electric?: string;

  @property({
    type: 'string',
  })
  wind?: string;

  @property({
    type: 'string',
  })
  psychic?: string;

  @property({
    type: 'string',
  })
  nuclear?: string;

  @property({
    type: 'string',
  })
  bless?: string;

  @property({
    type: 'string',
  })
  curse?: string;

  @property({
    type: 'string',
  })
  almighty?: string;

  @property({
    type: 'number',
  })
  personaId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DamageEffectiveness>) {
    super(data);
  }
}

export interface DamageEffectivenessRelations {
  // describe navigational properties here
}

export type DamageEffectivenessWithRelations = DamageEffectiveness & DamageEffectivenessRelations;
