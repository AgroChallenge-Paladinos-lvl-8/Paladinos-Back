import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Produtos, ProdutosRelations} from '../models';

export class ProdutosRepository extends DefaultCrudRepository<
  Produtos,
  typeof Produtos.prototype.id,
  ProdutosRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(Produtos, dataSource);
  }
}
