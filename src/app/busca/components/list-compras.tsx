'use client'

import { useSearchParams } from "next/navigation";
import { ComprasProps } from "../types/compra";
import { filtrosZodData } from "./form-filters";
import { useEffect, useState } from "react";
import { getCompras } from "@/actions/get-compras";
import { useMoment } from "../util/moment-js";
import { formatToBRLCurrency } from "../util/format-to-BRL";
import Link from "next/link";
import { ArrowCircleUp, ArrowElbowDownRight } from "@phosphor-icons/react";
import { highlightText } from '../util/highlight-text';


interface ListComprasProps {
  compras: ComprasProps[];
  setCompras: ( compras: ComprasProps[] ) => void;
  loading: boolean;
}

export function ListCompras( { loading, compras, setCompras }: ListComprasProps ) {

  const searchParams = useSearchParams();
  const rawParamsObj = Object.fromEntries( searchParams );
  const [showScrollButton, setShowScrollButton] = useState( false );

  // Parse as requests que são strings JSON
  const searchParamsObj = {
    ...rawParamsObj,
    requestOne: rawParamsObj.requestOne ? JSON.parse( rawParamsObj.requestOne ) : undefined,
    requestTwo: rawParamsObj.requestTwo ? JSON.parse( rawParamsObj.requestTwo ) : undefined,
    requestThree: rawParamsObj.requestThree ? JSON.parse( rawParamsObj.requestThree ) : undefined,
    requestFour: rawParamsObj.requestFour ? JSON.parse( rawParamsObj.requestFour ) : undefined,
    requestFive: rawParamsObj.requestFive ? JSON.parse( rawParamsObj.requestFive ) : undefined,
  } as unknown as filtrosZodData;

  useEffect( () => {

    const hasValidSearchTerm = [
      searchParamsObj.requestOne?.termo,
      searchParamsObj.requestTwo?.termo,
      searchParamsObj.requestThree?.termo,
      searchParamsObj.requestFour?.termo,
      searchParamsObj.requestFive?.termo
    ].some( termo => Boolean( termo ) );

    if ( !hasValidSearchTerm ) {
      console.log( 'Nenhum termo de busca válido encontrado' );
      setCompras( [] );
      return;
    }

    let allRequests: ComprasProps[] = [];

    async function makeIndividualRequest(
      requestData: { termo: string; tipoDeBusca: "palavra" | "frase" },
      commonData: Omit<filtrosZodData, 'requestOne' | 'requestTwo' | 'requestThree' | 'requestFour' | 'requestFive'>
    ) {
      if ( !requestData?.termo ) return [];

      const requestParams = {
        requestOne: {
          termo: requestData.termo,
          tipoDeBusca: requestData.tipoDeBusca,
        },
        ...commonData,
      };

      try {

        const result = await getCompras( {
          query: {
            ...requestParams,
            termo: requestParams.requestOne.termo,
            tipoDeBusca: requestParams.requestOne.tipoDeBusca,
            ano: requestParams.ano || '',
            filtrarPor: requestParams.filtrarPor || '',
            de: requestParams.de || '',
            ate: requestParams.ate || '',
            statusDaCompra: requestParams.statusDaCompra || '',
            situacaoDaCompra: requestParams.situacaoDaCompra || '',
            camposDeBusca: requestParams.camposDeBusca || [],
            incluir: requestParams.incluir || '',
            excluir: requestParams.excluir || ''
          }
        } );
        return result;
      } catch ( error ) {
        console.error( `Erro ao buscar com termo: ${requestData.termo}`, error );
        return [];
      }
    }

    async function fetchCompras() {
      try {
        const { requestOne, requestTwo, requestThree, requestFour, requestFive, ...commonData } = searchParamsObj;

        const requests = [
          requestOne,
          requestTwo,
          requestThree,
          requestFour,
          requestFive,
        ].filter( ( request ): request is { termo: string; tipoDeBusca: "palavra" | "frase" } =>
          Boolean( request?.termo && request?.tipoDeBusca && ["palavra", "frase"].includes( request.tipoDeBusca ) )
        );

        const delay = ( ms: number ) => new Promise( resolve => setTimeout( resolve, ms ) );
        // Executa as requisições sequencialmente com delay
        const results = [];
        for ( const request of requests ) {
          const result = await makeIndividualRequest( request, commonData );
          results.push( result );
          await delay( 1000 ); // Espera 1 segundo entre cada requisição
        }

        allRequests = results.flat();

        // Remove duplicatas pelo ID da compra
        const uniqueCompras = Array.from(
          new Map( allRequests.map( item => [item.compra.id, item] ) ).values()
        );

        setCompras( uniqueCompras );
      } catch ( error ) {
        console.error( 'Erro ao buscar compras:', error );
        setCompras( [] );
      }
    }

    fetchCompras();
  }, [searchParams] ); // Adiciona searchParams como dependência


  const searchTerms = [
    searchParamsObj.requestOne?.termo.toLowerCase(),
    searchParamsObj.requestTwo?.termo.toLowerCase(),
    searchParamsObj.requestThree?.termo.toLowerCase(),
    searchParamsObj.requestFour?.termo.toLowerCase(),
    searchParamsObj.requestFive?.termo.toLowerCase(),
  ].filter( Boolean ) as string[];

  function getBgColorForTerm( compra: ComprasProps, searchTerms: string[], reqColors: string[] ) {
    // Encontra o índice do termo que corresponde ao termo da compra
    const termIndex = searchTerms.findIndex( term =>
      term.toLowerCase() === compra.termo.toLowerCase()
    );

    // Retorna a cor correspondente ao termo ou vazio se não encontrar
    return termIndex >= 0 ? reqColors[termIndex] : '';
  }

  const reqColors = [
    'bg-blue-50',
    'bg-green-50',
    'bg-yellow-50',
    'bg-pink-50',
    'bg-purple-50',
  ]
  // Adicione esta função no componente
  function scrollToTerm( termo: string ) {
    const element = document.getElementById( termo.toLowerCase() );
    if ( element ) {
      element.scrollIntoView( {
        behavior: 'smooth',
        block: 'start'
      } );
    }
  }

  function scrollToTop() {
    window.scrollTo( {
      top: 0,
      behavior: 'smooth'
    } );
  }

  useEffect( () => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton( scrollY > 2000 );
    };

    window.addEventListener( 'scroll', handleScroll );
    return () => window.removeEventListener( 'scroll', handleScroll );
  }, [] );

  if ( loading ) return <p>Buscando compras ...</p>;
  if ( !compras.length ) return <p>Nenhuma compra encontrada!</p>;
  return (
    <div className="flex flex-col gap-4 relative">
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 flex gap-2 items-center bottom-4  px-6 hover:bg-cyan-400 transition-all z-10">
          <ArrowCircleUp size={24} className="text-cyan-50" />
          Voltar para o topo
        </button>
      )}
      <p className="text-14">Itens encontrados: <span className="font-medium">{compras.length}</span></p>
      <div className="flex gap-4 flex-wrap">
        {searchTerms.map( ( term, index ) => (
          <div
            onClick={() => scrollToTerm( term )}
            key={index}
            className={`px-4 cursor-pointer py-2 ${reqColors[index]} flex items-center gap-2 border border-neutral-500`}
          >
            <span className="font-medium">Termo {index + 1}:</span>
            <span>{term}</span>
          </div>
        ) )}
      </div>
      <div className="flex flex-col gap-4">
        {compras.map( ( compra, index ) => {
          const bgColor = getBgColorForTerm( compra, searchTerms, reqColors );
          return (
            <div
              id={compra.termo}
              key={index} className={`flex flex-col  border-neutral-500  gap-4 *:text-14 border p-2 ${bgColor}`}>
              <section className="flex gap-2 flex-wrap">
                <div className="flex gap-2 ">
                  <span className="font-medium text-cyan-600">Título:</span>
                  <p className="text-14 text-pretty text-cyan-600">{compra.compra.title}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium text-cyan-600">Ano:</span>
                  <p className="text-14 text-pretty text-cyan-600">{compra.redirect.ano}</p>
                </div>
                {compra.detalhes?.usuarioNome && (
                  <div className="flex gap-2 ">
                    <span className="font-medium text-cyan-600">Usuário:</span>
                    <p className="text-14 text-pretty text-cyan-600">{compra.detalhes.usuarioNome}</p>
                  </div>
                )}
              </section>
              <section>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Termo:</span>
                  <p className="text-14 text-pretty capitalize text-cyan-500 font-medium">
                    {compra.termo}
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Encontrado em:</span>
                  <p className="text-14 text-pretty capitalize text-cyan-500 font-medium">
                    {compra.camposEncontrados?.join( ', ' ) || 'Nenhum campo'}
                  </p>
                </div>
              </section>
              <section>
                <div className="flex gap-2 ">
                  <span className="font-medium">Descrição:</span>
                  <p className="text-14 text-pretty lowercase">
                    {highlightText( compra.compra.description.toLowerCase(), searchTerms )}
                  </p>
                </div>
                {compra.detalhes?.informacaoComplementar && (
                  <div className="flex gap-2 ">
                    <span className="font-medium">Informação Complementar:</span>
                    <p className="text-14 text-pretty lowercase">
                      {highlightText( compra?.detalhes?.informacaoComplementar.toLowerCase(), searchTerms )}
                    </p>
                  </div>
                )}
              </section>
              <section className="flex gap-2 flex-wrap">
                <div className="flex gap-2 ">
                  <span className="font-medium shrink-0">Data Publicação PNCP:</span>
                  <p className="text-14  ">{compra.bloco1.data_publicacao_pncp ? useMoment( compra.bloco1.data_publicacao_pncp ).format( "DD.MM.YYYY" ) : "Data não informada"}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium shrink-0">Data início Vigência:</span>
                  <p className="text-14 ">{compra.bloco1.data_inicio_vigencia ? useMoment( compra.bloco1.data_inicio_vigencia ).format( "DD.MM.YYYY" ) : "Data não informada"}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium shrink-0">Data Fim Vigência:</span>
                  <p className="text-14  ">{compra.bloco1.data_fim_vigencia ? useMoment( compra.bloco1.data_fim_vigencia ).format( "DD.MM.YYYY" ) : "Data não informada"}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium shrink-0">Data encerramento da Proposta:</span>
                  <p className="text-14  ">{compra.detalhes?.dataEncerramentoProposta ? useMoment( compra.detalhes.dataEncerramentoProposta ).format( "DD.MM.YYYY" ) : "Data não informada"}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium shrink-0">Data encerramento da Proposta:</span>
                  <p className="text-14  ">{compra.detalhes?.dataAtualizacaoGlobal ? useMoment( compra.detalhes.dataAtualizacaoGlobal ).format( "DD.MM.YYYY" ) : "Data não informada"}</p>
                </div>
              </section>
              <section>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Tipo do Documento:</span>
                  <p className="text-14  text-pretty  capitalize">{compra.bloco1.tipo_nome}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Situação:</span>
                  <p className="text-14  text-pretty  capitalize">{compra.bloco1.situacao_nome}</p>
                </div>
              </section>
              <section>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Valor total Estimado:</span>
                  <p className="text-14  text-pretty  capitalize">{compra.detalhes?.valorTotalEstimado ? formatToBRLCurrency( Number( compra.detalhes?.valorTotalEstimado ) ) : "Valor não informado"}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Valor total Homologado:</span>
                  <p className="text-14  text-pretty  capitalize">{compra.detalhes?.valorTotalHomologado ? formatToBRLCurrency( Number( compra.detalhes?.valorTotalHomologado ) ) : "Valor não informado"}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Valor Global:</span>
                  <p className="text-14  text-pretty  capitalize">{compra.bloco1.valor_global ? formatToBRLCurrency( Number( compra.bloco1.valor_global ) ) : "Valor não informado"}</p>
                </div>
              </section>
              <section className="flex gap-2">
                <div className="flex gap-2 ">
                  <span className="font-medium ">Orgão Nome:</span>
                  <p className="text-14  text-pretty capitalize ">{compra.orgao.nome}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Orgão CNPJ:</span>
                  <p className="text-14  text-pretty capitalize ">{compra.orgao.cnpj}</p>
                </div>
              </section>
              <section>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Modalidade:</span>
                  <p className="text-14  text-pretty capitalize ">{compra?.detalhes?.modalidadeNome}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Processo:</span>
                  <p className="text-14  text-pretty capitalize ">{compra?.detalhes?.processo}</p>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium ">Tipo do instrumento Convocatorio:</span>
                  <p className="text-14  text-pretty capitalize ">{compra?.detalhes?.tipoInstrumentoConvocatorioNome}</p>
                </div>
              </section>
              <section className="flex gap-2">
                <Link
                  target="_blank"
                  href={`https://pncp.gov.br/app/editais/${compra.redirect.orgao_cnpj}/${compra.redirect.ano}/${compra.redirect.numero_sequencial}`}>
                  <button className="px-4 bg-neutral-50 border text-cyan-400 flex items-center gap-2">
                    <ArrowElbowDownRight size={20} className="text-cyan-400" />
                    PNCP
                  </button>
                </Link>
                {compra?.detalhes?.linkSistemaOrigem && <Link
                  target="_blank"
                  href={compra?.detalhes?.linkSistemaOrigem}>
                  <button className="px-4 bg-neutral-50 border text-cyan-400 flex items-center gap-2">
                    <ArrowElbowDownRight size={20} className="text-cyan-400" />
                    COMPRAS BR
                  </button>
                </Link>}
              </section>
              <section className="flex flex-col gap-4">
                <h2 className="text-16 font-semibold">Itens:</h2>
                <section className="flex flex-col gap-4">
                  {compra.itens.map( ( item, index ) => {
                    return (
                      <div key={index} className="flex flex-col gap-2 border p-2">
                        <div className="flex gap-2">
                          <span className="font-medium ">Item:</span>
                          <p className="text-14  text-pretty capitalize ">{item.numeroItem}</p>
                        </div>
                        <div className="flex gap-2 ">
                          <span className="font-medium ">Valor do item:</span>
                          <p className="text-14  text-pretty capitalize ">{item.valorUnitarioEstimado ? formatToBRLCurrency( item.valorUnitarioEstimado ) : "Valor não informado"}</p>
                        </div>
                        <div className="flex gap-2 ">
                          <span className="font-medium shrink-0">Informação complementar:</span>
                          <p className="text-14  text-pretty capitalize">{item.informacaoComplementar ? highlightText( item.informacaoComplementar.toLowerCase(), searchTerms ) : "Não informado"}</p>
                        </div>
                        <div className="flex gap-2 ">
                          <span className="font-medium ">Descrição:</span>
                          <p className="text-14  text-pretty capitalize">{item.descricao ? highlightText( item.descricao, searchTerms ) : "Não informado"}</p>
                        </div>
                      </div>
                    )
                  } )}
                </section>
              </section>
            </div>
          )
        } )}
      </div>
    </div>
  );
}
