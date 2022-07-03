import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Persona, PersonaRelations, DamageEffectiveness} from '../models';
import {DamageEffectivenessRepository} from './damage-effectiveness.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly damageEffectiveness: HasOneRepositoryFactory<DamageEffectiveness, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('DamageEffectivenessRepository') protected damageEffectivenessRepositoryGetter: Getter<DamageEffectivenessRepository>,
  ) {
    super(Persona, dataSource);
    this.damageEffectiveness = this.createHasOneRepositoryFactoryFor('damageEffectiveness', damageEffectivenessRepositoryGetter);
    this.registerInclusionResolver('damageEffectiveness', this.damageEffectiveness.inclusionResolver);
  }
}
