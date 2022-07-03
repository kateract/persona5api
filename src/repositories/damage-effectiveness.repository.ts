import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {DamageEffectiveness, DamageEffectivenessRelations} from '../models';

export class DamageEffectivenessRepository extends DefaultCrudRepository<
  DamageEffectiveness,
  typeof DamageEffectiveness.prototype.id,
  DamageEffectivenessRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(DamageEffectiveness, dataSource);
  }
}
