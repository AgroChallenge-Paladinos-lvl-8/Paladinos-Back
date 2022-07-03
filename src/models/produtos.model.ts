import {Entity, model, property, hasMany} from '@loopback/repository';
import {Estoques} from './estoques.model';

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

  @hasMany(() => Estoques, {keyTo: 'id_produto'})
  estoques: Estoques[];

  constructor(data?: Partial<Produtos>) {
    super(data);
  }
}

export interface ProdutosRelations {
  // describe navigational properties here
}

export type ProdutosWithRelations = Produtos & ProdutosRelations;
