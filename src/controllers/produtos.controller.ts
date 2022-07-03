import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Produtos} from '../models';
import {ProdutosRepository} from '../repositories';

export class ProdutosController {
  constructor(
    @repository(ProdutosRepository)
    public produtosRepository : ProdutosRepository,
  ) {}

  @post('/produtos')
  @response(200, {
    description: 'Produtos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Produtos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produtos, {
            title: 'NewProdutos',
            exclude: ['id'],
          }),
        },
      },
    })
    produtos: Omit<Produtos, 'id'>,
  ): Promise<Produtos> {
    return this.produtosRepository.create(produtos);
  }

  @get('/produtos/count')
  @response(200, {
    description: 'Produtos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Produtos) where?: Where<Produtos>,
  ): Promise<Count> {
    return this.produtosRepository.count(where);
  }

  @get('/produtos')
  @response(200, {
    description: 'Array of Produtos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Produtos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Produtos) filter?: Filter<Produtos>,
  ): Promise<Produtos[]> {
    return this.produtosRepository.find(filter);
  }

  @patch('/produtos')
  @response(200, {
    description: 'Produtos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produtos, {partial: true}),
        },
      },
    })
    produtos: Produtos,
    @param.where(Produtos) where?: Where<Produtos>,
  ): Promise<Count> {
    return this.produtosRepository.updateAll(produtos, where);
  }

  @get('/produtos/{id}')
  @response(200, {
    description: 'Produtos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Produtos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Produtos, {exclude: 'where'}) filter?: FilterExcludingWhere<Produtos>
  ): Promise<Produtos> {
    return this.produtosRepository.findById(id, filter);
  }

  @patch('/produtos/{id}')
  @response(204, {
    description: 'Produtos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produtos, {partial: true}),
        },
      },
    })
    produtos: Produtos,
  ): Promise<void> {
    await this.produtosRepository.updateById(id, produtos);
  }

  @put('/produtos/{id}')
  @response(204, {
    description: 'Produtos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() produtos: Produtos,
  ): Promise<void> {
    await this.produtosRepository.replaceById(id, produtos);
  }

  @del('/produtos/{id}')
  @response(204, {
    description: 'Produtos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.produtosRepository.deleteById(id);
  }
}
