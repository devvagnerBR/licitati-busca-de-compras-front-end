export interface ComprasProps {
  encontradoEm?: string,
  camposEncontrados?: string[],
  termo: string,
  compra: {
    id: number,
    data_publicacao_pncp: string,
    createdAt: string,
    title: string,
    description: string,
    numero_controle_pncp: string
  },
  orgao: {
    id: number,
    cnpj: string,
    unidade_id: number,
    nome: string,
    esfera_nome: string,
    unidade_nome: string,
    municipio_nome: string,
    uf: string
  },
  redirect: {
    url: string,
    itens: string,
    arquivos: string,
    numero_sequencial: string,
    ano: string,
    orgao_cnpj: string
  },
  bloco1: {
    title: string
    document_type: string
    tipo_nome: string
    situacao_nome: string
    valor_global: string
    orgao_id: string
    orgao_cnpj: string
    orgao_nome: string
    unidade_codigo: string
    unidade_nome: string
    municipio_nome: string
    uf: string
    ano: string
    data_publicacao_pncp: string
    data_inicio_vigencia: string
    data_fim_vigencia: string
    cancelado: string
    tem_resultado: string
  },
  detalhes: {
    linkSistemaOrigem: string,
    usuarioNome: string,
    valorTotalEstimado: number,
    valorTotalHomologado: number,
    anoCompra: number,
    processo: string,
    unidadeOrgao: {
      ufSigla: string,
      municipioNome: string,
    },
    situacaoCompraId: number,
    situacaoCompraNome: string,
    modalidadeNome: string,
    tipoInstrumentoConvocatorioNome: string,
    dataPublicacaoPncp: string,
    dataEncerramentoProposta: string,
    dataAtualizacaoGlobal: string,
    objetoCompra: string,
    informacaoComplementar: string,

  },
  itens: {
    numeroItem: number,
    descricao: string,
    informacaoComplementar: string,
    valorUnitarioEstimado: number;

  }[]
}
