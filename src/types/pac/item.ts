




export interface ITEM_PAC_INTERFACE {
  empty: boolean;
  numeroPagina: number;
  paginasRestantes: number;
  totalPaginas: number;
  totalRegistros: number;
  data: DATA_INTERFACE[]
}

interface DATA_INTERFACE {
  anoPca: string;
  codigoUnidade: string;
  dataPublicacaoPNCP: string;
  idPcaPncp: string;
  itens: ITEM_INTERFACE[];
  nomeUnidade: string;
  orgaoEntidadeCnpj: string;
  orgaoEntidadeRazaoSocial: string;
}

interface ITEM_INTERFACE {
  categoriaItemPcaNome: string;
  classificacaoCatalogoId: number;
  classificacaoSuperiorCodigo: string;
  classificacaoSuperiorNome: string;
  codigoItem: string;
  dataAtualizacao: string;
  dataDesejada: string;
  dataInclusao: string;
  descricaoItem: string;
  grupoContratacaoCodigo: string;
  grupoContratacaoNome: string;
  nomeClassificacaoCatalogo: string;
  numeroItem: number;
  pdmCodigo: string;
  pdmDescricao: string;
  quantidadeEstimada: number;
  unidadeFornecimento: string;
  unidadeRequisitante: string;
  valorOrcamentoExercicio: number;
  valorTotal: number;
  valorUnitario: number;
}
// interface ITEM_INTERFACE {
//   item: string;
//   classificacaoCatalogoId: number;
//   classificacaoSuperiorCodigo: string;
//   classificacaoSuperiorNome: string;
//   codigoItem: string;
//   dataAtualizacao: string;
//   dataDesejada: string;
//   dataInclusao: string;
//   descricaoItem: string;
//   grupoContratacaoCodigo: null;
//   grupoContratacaoNome: null;
//   nomeClassificacaoCatalogo: string;
//   numeroItem: number;
//   pdmCodigo: null;
//   pdmDescricao: null;
//   quantidadeEstimada: number;
//   unidadeFornecimento: string;
//   unidadeRequisitante: string;
//   valorOrcamentoExercicio: number;
//   valorTotal: number;
//   valorUnitario: number;
// }
