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
  Question,
  Answer,
} from '../models';
import {QuestionRepository} from '../repositories';

export class QuestionAnswerController {
  constructor(
    @repository(QuestionRepository) protected questionRepository: QuestionRepository,
  ) { }

  @get('/questions/{id}/answers', {
    responses: {
      '200': {
        description: 'Array of Question has many Answer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Answer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Answer>,
  ): Promise<Answer[]> {
    return this.questionRepository.answers(id).find(filter);
  }

  @post('/questions/{id}/answers', {
    responses: {
      '200': {
        description: 'Question model instance',
        content: {'application/json': {schema: getModelSchemaRef(Answer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Question.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Answer, {
            title: 'NewAnswerInQuestion',
            exclude: ['id'],
            optional: ['questionId']
          }),
        },
      },
    }) answer: Omit<Answer, 'id'>,
  ): Promise<Answer> {
    return this.questionRepository.answers(id).create(answer);
  }

  @patch('/questions/{id}/answers', {
    responses: {
      '200': {
        description: 'Question.Answer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Answer, {partial: true}),
        },
      },
    })
    answer: Partial<Answer>,
    @param.query.object('where', getWhereSchemaFor(Answer)) where?: Where<Answer>,
  ): Promise<Count> {
    return this.questionRepository.answers(id).patch(answer, where);
  }

  @del('/questions/{id}/answers', {
    responses: {
      '200': {
        description: 'Question.Answer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Answer)) where?: Where<Answer>,
  ): Promise<Count> {
    return this.questionRepository.answers(id).delete(where);
  }
}
