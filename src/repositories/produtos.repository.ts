import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Produtos, ProdutosRelations, Estoques} from '../models';
import {EstoquesRepository} from './estoques.repository';

export class ProdutosRepository extends DefaultCrudRepository<
  Produtos,
  typeof Produtos.prototype.id,
  ProdutosRelations
> {

  public readonly estoques: HasManyRepositoryFactory<Estoques, typeof Produtos.prototype.id>;

  constructor(
    @inject('datasources.DB') dataSource: DbDataSource, @repository.getter('EstoquesRepository') protected estoquesRepositoryGetter: Getter<EstoquesRepository>,
  ) {
    super(Produtos, dataSource);
    this.estoques = this.createHasManyRepositoryFactoryFor('estoques', estoquesRepositoryGetter,);
    this.registerInclusionResolver('estoques', this.estoques.inclusionResolver);
  }
}
