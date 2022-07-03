import {Entity, model, property, hasMany} from '@loopback/repository';
import {Answer} from './answer.model';

@model({settings: {strict: false, validateUpsert: true, idInjection: true}})
export class Question extends Entity {
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
  text: string;

  @hasMany(() => Answer)
  answers: Answer[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Question>) {
    super(data);
  }
}

export interface QuestionRelations {
  // describe navigational properties here
}

export type QuestionWithRelations = Question & QuestionRelations;
