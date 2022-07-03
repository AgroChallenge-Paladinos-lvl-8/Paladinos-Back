import {Entity, model, property} from '@loopback/repository';

@model()
export class Produtos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
  })
  fabricante?: string;

  @property({
    type: 'string',
  })
  fornecedor?: string;


  constructor(data?: Partial<Produtos>) {
    super(data);
  }
}

export interface ProdutosRelations {
  // describe navigational properties here
}

export type ProdutosWithRelations = Produtos & ProdutosRelations;
