import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Estoques,
  Produtos,
} from '../models';
import {EstoquesRepository} from '../repositories';

export class EstoquesProdutosController {
  constructor(
    @repository(EstoquesRepository)
    public estoquesRepository: EstoquesRepository,
  ) { }

  @get('/estoques/{id}/produtos', {
    responses: {
      '200': {
        description: 'Produtos belonging to Estoques',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Produtos)},
          },
        },
      },
    },
  })
  async getProdutos(
    @param.path.number('id') id: typeof Estoques.prototype.id,
  ): Promise<Produtos> {
    return this.estoquesRepository.produtos(id);
  }
}
