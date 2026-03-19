export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: string;
  qtEstoque: number;
  observacoes: string;
  reposicaoSolicitada: boolean;
}

export type PayloadProduto = Omit<Produto, 'id'>;
