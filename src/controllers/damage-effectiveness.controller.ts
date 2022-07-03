import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DamageEffectiveness} from '../models';
import {DamageEffectivenessRepository} from '../repositories';

export class DamageEffectivenessController {
  constructor(
    @repository(DamageEffectivenessRepository)
    public damageEffectivenessRepository : DamageEffectivenessRepository,
  ) {}

  @post('/damage-effectivenesses')
  @response(200, {
    description: 'DamageEffectiveness model instance',
    content: {'application/json': {schema: getModelSchemaRef(DamageEffectiveness)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DamageEffectiveness, {
            title: 'NewDamageEffectiveness',
            exclude: ['id'],
          }),
        },
      },
    })
    damageEffectiveness: Omit<DamageEffectiveness, 'id'>,
  ): Promise<DamageEffectiveness> {
    return this.damageEffectivenessRepository.create(damageEffectiveness);
  }

  @get('/damage-effectivenesses/count')
  @response(200, {
    description: 'DamageEffectiveness model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DamageEffectiveness) where?: Where<DamageEffectiveness>,
  ): Promise<Count> {
    return this.damageEffectivenessRepository.count(where);
  }

  @get('/damage-effectivenesses')
  @response(200, {
    description: 'Array of DamageEffectiveness model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DamageEffectiveness, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DamageEffectiveness) filter?: Filter<DamageEffectiveness>,
  ): Promise<DamageEffectiveness[]> {
    return this.damageEffectivenessRepository.find(filter);
  }

  @patch('/damage-effectivenesses')
  @response(200, {
    description: 'DamageEffectiveness PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DamageEffectiveness, {partial: true}),
        },
      },
    })
    damageEffectiveness: DamageEffectiveness,
    @param.where(DamageEffectiveness) where?: Where<DamageEffectiveness>,
  ): Promise<Count> {
    return this.damageEffectivenessRepository.updateAll(damageEffectiveness, where);
  }

  @get('/damage-effectivenesses/{id}')
  @response(200, {
    description: 'DamageEffectiveness model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DamageEffectiveness, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DamageEffectiveness, {exclude: 'where'}) filter?: FilterExcludingWhere<DamageEffectiveness>
  ): Promise<DamageEffectiveness> {
    return this.damageEffectivenessRepository.findById(id, filter);
  }

  @patch('/damage-effectivenesses/{id}')
  @response(204, {
    description: 'DamageEffectiveness PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DamageEffectiveness, {partial: true}),
        },
      },
    })
    damageEffectiveness: DamageEffectiveness,
  ): Promise<void> {
    await this.damageEffectivenessRepository.updateById(id, damageEffectiveness);
  }

  @put('/damage-effectivenesses/{id}')
  @response(204, {
    description: 'DamageEffectiveness PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() damageEffectiveness: DamageEffectiveness,
  ): Promise<void> {
    await this.damageEffectivenessRepository.replaceById(id, damageEffectiveness);
  }

  @del('/damage-effectivenesses/{id}')
  @response(204, {
    description: 'DamageEffectiveness DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.damageEffectivenessRepository.deleteById(id);
  }
}
