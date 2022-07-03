import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Estoques, EstoquesRelations} from '../models';

export class EstoquesRepository extends DefaultCrudRepository<
  Estoques,
  typeof Estoques.prototype.id,
  EstoquesRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(Estoques, dataSource);
  }
}
