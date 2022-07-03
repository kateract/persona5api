import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Question, QuestionRelations, Answer} from '../models';
import {AnswerRepository} from './answer.repository';

export class QuestionRepository extends DefaultCrudRepository<
  Question,
  typeof Question.prototype.id,
  QuestionRelations
> {

  public readonly answers: HasManyRepositoryFactory<Answer, typeof Question.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('AnswerRepository') protected answerRepositoryGetter: Getter<AnswerRepository>,
  ) {
    super(Question, dataSource);
    this.answers = this.createHasManyRepositoryFactoryFor('answers', answerRepositoryGetter,);
    this.registerInclusionResolver('answers', this.answers.inclusionResolver);
  }
}
