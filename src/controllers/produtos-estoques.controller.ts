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
  Produtos,
  Estoques,
} from '../models';
import {ProdutosRepository} from '../repositories';

export class ProdutosEstoquesController {
  constructor(
    @repository(ProdutosRepository) protected produtosRepository: ProdutosRepository,
  ) { }

  @get('/produtos/{id}/estoques', {
    responses: {
      '200': {
        description: 'Array of Produtos has many Estoques',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estoques)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Estoques>,
  ): Promise<Estoques[]> {
    return this.produtosRepository.estoques(id).find(filter);
  }

  @post('/produtos/{id}/estoques', {
    responses: {
      '200': {
        description: 'Produtos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estoques)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Produtos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estoques, {
            title: 'NewEstoquesInProdutos',
            exclude: ['id'],
            optional: ['id_produto']
          }),
        },
      },
    }) estoques: Omit<Estoques, 'id'>,
  ): Promise<Estoques> {
    return this.produtosRepository.estoques(id).create(estoques);
  }

  @patch('/produtos/{id}/estoques', {
    responses: {
      '200': {
        description: 'Produtos.Estoques PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estoques, {partial: true}),
        },
      },
    })
    estoques: Partial<Estoques>,
    @param.query.object('where', getWhereSchemaFor(Estoques)) where?: Where<Estoques>,
  ): Promise<Count> {
    return this.produtosRepository.estoques(id).patch(estoques, where);
  }

  @del('/produtos/{id}/estoques', {
    responses: {
      '200': {
        description: 'Produtos.Estoques DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Estoques)) where?: Where<Estoques>,
  ): Promise<Count> {
    return this.produtosRepository.estoques(id).delete(where);
  }
}
