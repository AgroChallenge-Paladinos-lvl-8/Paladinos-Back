import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Estoques, EstoquesRelations, Produtos} from '../models';
import {ProdutosRepository} from './produtos.repository';

export class EstoquesRepository extends DefaultCrudRepository<
  Estoques,
  typeof Estoques.prototype.id,
  EstoquesRelations
> {

  public readonly produtos: BelongsToAccessor<Produtos, typeof Estoques.prototype.id>;

  constructor(
    @inject('datasources.DB') dataSource: DbDataSource, @repository.getter('ProdutosRepository') protected produtosRepositoryGetter: Getter<ProdutosRepository>,
  ) {
    super(Estoques, dataSource);
    this.produtos = this.createBelongsToAccessorFor('produtos', produtosRepositoryGetter,);
    this.registerInclusionResolver('produtos', this.produtos.inclusionResolver);
  }
}
