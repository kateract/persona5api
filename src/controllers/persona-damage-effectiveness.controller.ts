import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  DamageEffectiveness,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaDamageEffectivenessController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/damage-effectiveness', {
    responses: {
      '200': {
        description: 'Persona has one DamageEffectiveness',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DamageEffectiveness),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DamageEffectiveness>,
  ): Promise<DamageEffectiveness> {
    return this.personaRepository.damageEffectiveness(id).get(filter);
  }

  @post('/personas/{id}/damage-effectiveness', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(DamageEffectiveness)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DamageEffectiveness, {
            title: 'NewDamageEffectivenessInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) damageEffectiveness: Omit<DamageEffectiveness, 'id'>,
  ): Promise<DamageEffectiveness> {
    return this.personaRepository.damageEffectiveness(id).create(damageEffectiveness);
  }

  @patch('/personas/{id}/damage-effectiveness', {
    responses: {
      '200': {
        description: 'Persona.DamageEffectiveness PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DamageEffectiveness, {partial: true}),
        },
      },
    })
    damageEffectiveness: Partial<DamageEffectiveness>,
    @param.query.object('where', getWhereSchemaFor(DamageEffectiveness)) where?: Where<DamageEffectiveness>,
  ): Promise<Count> {
    return this.personaRepository.damageEffectiveness(id).patch(damageEffectiveness, where);
  }

  @del('/personas/{id}/damage-effectiveness', {
    responses: {
      '200': {
        description: 'Persona.DamageEffectiveness DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DamageEffectiveness)) where?: Where<DamageEffectiveness>,
  ): Promise<Count> {
    return this.personaRepository.damageEffectiveness(id).delete(where);
  }
}
