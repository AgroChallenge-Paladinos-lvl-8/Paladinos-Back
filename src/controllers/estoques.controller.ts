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
import {Estoques} from '../models';
import {EstoquesRepository} from '../repositories';

export class EstoquesController {
  constructor(
    @repository(EstoquesRepository)
    public estoquesRepository : EstoquesRepository,
  ) {}

  @post('/estoques')
  @response(200, {
    description: 'Estoques model instance',
    content: {'application/json': {schema: getModelSchemaRef(Estoques)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estoques, {
            title: 'NewEstoques',
            exclude: ['id'],
          }),
        },
      },
    })
    estoques: Omit<Estoques, 'id'>,
  ): Promise<Estoques> {
    return this.estoquesRepository.create(estoques);
  }

  @get('/estoques/count')
  @response(200, {
    description: 'Estoques model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Estoques) where?: Where<Estoques>,
  ): Promise<Count> {
    return this.estoquesRepository.count(where);
  }

  @get('/estoques')
  @response(200, {
    description: 'Array of Estoques model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Estoques, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Estoques) filter?: Filter<Estoques>,
  ): Promise<Estoques[]> {
    return this.estoquesRepository.find(filter);
  }

  @patch('/estoques')
  @response(200, {
    description: 'Estoques PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estoques, {partial: true}),
        },
      },
    })
    estoques: Estoques,
    @param.where(Estoques) where?: Where<Estoques>,
  ): Promise<Count> {
    return this.estoquesRepository.updateAll(estoques, where);
  }

  @get('/estoques/{id}')
  @response(200, {
    description: 'Estoques model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Estoques, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Estoques, {exclude: 'where'}) filter?: FilterExcludingWhere<Estoques>
  ): Promise<Estoques> {
    return this.estoquesRepository.findById(id, filter);
  }

  @patch('/estoques/{id}')
  @response(204, {
    description: 'Estoques PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estoques, {partial: true}),
        },
      },
    })
    estoques: Estoques,
  ): Promise<void> {
    await this.estoquesRepository.updateById(id, estoques);
  }

  @put('/estoques/{id}')
  @response(204, {
    description: 'Estoques PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estoques: Estoques,
  ): Promise<void> {
    await this.estoquesRepository.replaceById(id, estoques);
  }

  @del('/estoques/{id}')
  @response(204, {
    description: 'Estoques DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estoquesRepository.deleteById(id);
  }
}
