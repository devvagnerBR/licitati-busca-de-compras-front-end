'use client'

import { formatToBRLCurrency } from "@/app/licitati/util/format-to-BRL";
import { highlightText } from "@/app/licitati/util/highlight-text";
import { useMoment } from "@/app/licitati/util/moment-js";
import { ITEM_PAC_INTERFACE } from "@/types/pac/item";
import { FileCsv } from "@phosphor-icons/react";
import Link from "next/link";


interface ItensPacListProps {
  itens: ITEM_PAC_INTERFACE;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleSetItensPac: ( data: ITEM_PAC_INTERFACE ) => void;
  currentPage: number;
  loading: boolean;
  search: string;
}

export function ItensPacList( { search, loading, currentPage, itens: compras, handleNextPage, handlePreviousPage, handleSetItensPac }: ItensPacListProps ) {

  const data = compras.data

  function handlePagination( type: 'next' | 'previous' ) {
    if ( currentPage === 1 && type === 'previous' ) return;
    type === 'next' ? handleNextPage() : handlePreviousPage();
  }

  const filteredData = data.filter( item =>
    item.itens.some( it => it.descricaoItem?.toLowerCase().includes( search.toLowerCase().trim() ) )
  );


  if ( compras.empty ) return null;
  return (
    <div className="mt-8 flex flex-col gap-2 rounded-md p-2">
      <div className="flex justify-end gap-4 *:*:font-semibold">
        <p>Itens por página: <span>25</span></p>
        <p>Total de Páginas: <span>{compras.totalPaginas}</span></p>
        <p>Total de Itens encontrados: <span>{compras.totalRegistros}</span></p>
      </div>
      <div className="flex items-center justify-end gap-2 py-2">
        {currentPage > 1 && <button onClick={() => handlePagination( "previous" )} className="border p-2">Página anterior</button>}
        <p className="flex h-[37px] items-center justify-center border px-4 font-semibold">{currentPage}</p>
        {compras.totalPaginas > currentPage && <button onClick={() => handlePagination( "next" )} className="border p-2">Próxima Página</button>}
      </div>
      <div className="flex flex-col gap-4">
        {filteredData && filteredData.map( ( item, index ) => {
          //           <p className="text-14  ">{compra.bloco1.data_publicacao_pncp ? useMoment( compra.bloco1.data_publicacao_pncp ).format( "DD.MM.YYYY" ) : "Data não informada"}</p>
          return (
            <div key={index} className="flex flex-col gap-2 rounded-sm border p-2 *:*:text-14 *:text-14 *:*:font-medium">
              <p className="w-fit bg-cyan-200 p-1">Unidade: <span>{item.nomeUnidade}</span></p>
              <p>Razão Social: <span>{item.orgaoEntidadeRazaoSocial}</span></p>
              <p>Data Publicacao PNCP: <span>{useMoment( item.dataPublicacaoPNCP ).format( "DD.MM.YYYY" )}</span></p>
              <p>Ano Pca: <span>{item.anoPca}</span></p>
              <p>Cóodigo da Unidade: <span>{item.codigoUnidade}</span></p>
              <p>Órgão CNPJ: <span>{item.orgaoEntidadeCnpj}</span></p>
              <Link target="_blank" href={`https://pncp.gov.br/api/pncp/v1/orgaos/${item.orgaoEntidadeCnpj}/pca/${item.anoPca}/csv`} className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-neutral-200 p-2 shadow-sm hover:shadow-sm">
                <FileCsv size={20} className="cursor-pointer" />
                Planilha
              </Link>
              <div className="rounded-sm border border-neutral-100 p-2 shadow-sm">
                <p>itens:</p>
                <div className="mt-2 rounded-sm p-2">
                  {item.itens.map( ( item, index ) => {
                    return (
                      <div key={index} className="flex flex-col gap-2 p-2 *:*:text-14 *:text-14 *:*:font-medium *:capitalize">
                        <p className="w-fit rounded-sm border p-2 font-semibold lowercase text-cyan-600 shadow-sm">ITEM {index + 1}</p>
                        <p>Classificação Superior: <span>{item.classificacaoSuperiorNome}</span></p>
                        <p>Descrição item: <span>{highlightText( item.descricaoItem, [search] )}</span></p>
                        <p>Valor Total: <span>{formatToBRLCurrency( item.valorTotal )}</span></p>
                        <p>Valor Unitário: <span>{formatToBRLCurrency( item.valorUnitario )}</span></p>
                        <p>Valor Orcamento Exercicio: <span>{formatToBRLCurrency( item.valorOrcamentoExercicio )}</span></p>
                        <p>Categoria: <span>{item.categoriaItemPcaNome}</span></p>
                        <p>Nome no Catalogo: <span>{item.nomeClassificacaoCatalogo}</span></p>
                        <p>Classificacao Catalogo Id: <span>{item.classificacaoCatalogoId}</span></p>
                        <p>classificacao Superior Codigo: <span>{item.classificacaoSuperiorCodigo}</span></p>
                        <p>codigo Item: <span>{item.codigoItem}</span></p>
                        <p>data Atualizacao: <span>{useMoment( item.dataAtualizacao ).format( "DD.MM.YYYY" )}</span></p>
                        <p>data Desejada: <span>{useMoment( item.dataDesejada ).format( "DD.MM.YYYY" )}</span></p>
                        <p>data Inclusao: <span>{useMoment( item.dataInclusao ).format( "DD.MM.YYYY" )}</span></p>
                        <p>grupo Contratacao Codigo: <span>{item.grupoContratacaoCodigo}</span></p>
                        <p>numero Item: <span>{item.numeroItem}</span></p>
                        <p>pdm Codigo: <span>{item.pdmCodigo}</span></p>
                        <p>pdm Descricao: <span>{item.pdmDescricao}</span></p>
                        <p>quantidadeEstimada: <span>{item.quantidadeEstimada}</span></p>
                        <p>unidadeFornecimento: <span>{item.unidadeFornecimento}</span></p>
                        <p>unidadeRequisitante: <span>{item.unidadeRequisitante}</span></p>

                      </div>
                    )
                  } )}
                </div>

              </div>
            </div>
          )
        } )}

      </div>
      <div className="flex items-center justify-end gap-2 py-2">
        {currentPage > 1 && <button onClick={() => handlePagination( "previous" )} className="border p-2">Página anterior</button>}
        <p className="flex h-[37px] items-center justify-center border px-4 font-semibold">{currentPage}</p>
        {compras.totalPaginas > compras.numeroPagina && <button onClick={() => handlePagination( "next" )} className="border p-2">Próxima Página</button>}
      </div>
    </div>
  );
}
