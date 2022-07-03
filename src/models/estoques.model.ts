/* eslint-disable @typescript-eslint/naming-convention */
import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Produtos} from './produtos.model';

@model()
export class Estoques extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  @belongsTo(() => Produtos)
  id_produto: number;

  @property({
    type: 'date',
  })
  data_vencimento?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantidade: number;

  constructor(data?: Partial<Estoques>) {
    super(data);
  }
}

export interface EstoquesRelations {
  produto?: Produtos;
}

export type EstoquesWithRelations = Estoques & EstoquesRelations;
