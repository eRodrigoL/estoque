export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: string;
  qtEstoque: number;
  observacoes: string;
  reposicaoSolicitada: boolean;
}

export type PayloadProduto = Omit<Produto, 'id'>;
