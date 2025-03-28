'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { AdvancedSearch } from "./advanced-search";
import { ButtonsSearch } from "./buttons-search";
import { DateSearch } from "./date-search";
import { FieldsSearch } from "./fields-search";
import { StatusSearch } from "./status-search";
import { TermSearch } from "./term-search";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getCompras } from "@/actions/get-compras";
import { ComprasProps } from "../types/compra";
import { useEffect, useRef, useState } from "react";

interface FormFiltersProps {
  setCompras: ( compras: ComprasProps[] ) => void;
  setLoading: ( loading: boolean ) => void;
}

const filtrosZodSchema = z.object( {
  // termo: z.string().min( 3, "O termo deve ter no mínimo 3 caracteres" ),
  requestOne: z.object( {
    termo: z.string(),
    tipoDeBusca: z.enum( ["palavra", "frase"] ),
  } ),
  requestTwo: z.object( {
    termo: z.string(),
    tipoDeBusca: z.enum( ["palavra", "frase", ""] ).optional(),
  } ).optional(),
  requestThree: z.object( {
    termo: z.string(),
    tipoDeBusca: z.enum( ["palavra", "frase", ""] ).optional(),
  } ).optional(),
  requestFour: z.object( {
    termo: z.string(),
    tipoDeBusca: z.enum( ["palavra", "frase", ""] ).optional(),
  } ).optional(),
  requestFive: z.object( {
    termo: z.string(),
    tipoDeBusca: z.enum( ["palavra", "frase", ""] ).optional(),
  } ).optional(),
  ano: z.string(),
  filtrarPor: z.string().optional(),
  de: z.string().default( "0" ),
  ate: z.string().default( "12" ),
  statusDaCompra: z.string().optional(),
  situacaoDaCompra: z.string().optional(),
  camposDeBusca: z.array( z.string() ).default( ["detalhes", "itens", "arquivos"] ),
  incluir: z.string().optional(),
  excluir: z.string().optional(),
} )

export type filtrosZodData = z.infer<typeof filtrosZodSchema>;

export function FormFilters( { setCompras, setLoading }: FormFiltersProps ) {

  const [openInput, setOpenInput] = useState( false );
  const [controller, setController] = useState<AbortController | null>( null );
  const [showCancelButton, setShowCancelButton] = useState( false );

  const router = useRouter();
  const searchParams = useSearchParams();
  const rawParamsObj = Object.fromEntries( searchParams );

  // Parse as requests que são strings JSON
  const searchParamsObj = {
    ...rawParamsObj,
    requestOne: rawParamsObj.requestOne ? JSON.parse( rawParamsObj.requestOne ) : undefined,
    requestTwo: rawParamsObj.requestTwo ? JSON.parse( rawParamsObj.requestTwo ) : undefined,
    requestThree: rawParamsObj.requestThree ? JSON.parse( rawParamsObj.requestThree ) : undefined,
    requestFour: rawParamsObj.requestFour ? JSON.parse( rawParamsObj.requestFour ) : undefined,
    requestFive: rawParamsObj.requestFive ? JSON.parse( rawParamsObj.requestFive ) : undefined,
  } as unknown as filtrosZodData;


  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<filtrosZodData>( {
    resolver: zodResolver( filtrosZodSchema ),
    values: {
      requestOne: {
        termo: searchParamsObj.requestOne?.termo || '',
        tipoDeBusca: searchParamsObj.requestOne?.tipoDeBusca || 'palavra',
      },
      requestTwo: searchParamsObj.requestTwo || {
        termo: '',
        tipoDeBusca: 'palavra',
      },
      requestThree: searchParamsObj.requestThree || {
        termo: '',
        tipoDeBusca: 'palavra',
      },
      requestFour: searchParamsObj.requestFour || {
        termo: '',
        tipoDeBusca: 'palavra',
      },
      requestFive: searchParamsObj.requestFive || {
        termo: '',
        tipoDeBusca: 'palavra',
      },
      ano: searchParamsObj.ano || '2025',
      filtrarPor: searchParamsObj.filtrarPor || '',
      de: searchParamsObj.de || '1',
      ate: searchParamsObj.ate || '12',
      statusDaCompra: searchParamsObj.statusDaCompra || 'todos',
      situacaoDaCompra: searchParamsObj.situacaoDaCompra || '0',
      camposDeBusca: searchParamsObj.camposDeBusca || ["detalhes", "itens", "arquivos"],
      incluir: searchParamsObj.incluir || '',
      excluir: searchParamsObj.excluir || '',
    }
  } );

  // Adicione este useEffect após a declaração do useForm
  useEffect( () => {
    if ( !openInput ) {
      // Mantém apenas o requestOne e reseta os outros
      const currentValues = { ...searchParamsObj };
      reset( {
        ...currentValues,
        requestTwo: {
          termo: '',
          tipoDeBusca: 'palavra',
        },
        requestThree: {
          termo: '',
          tipoDeBusca: 'palavra',
        },
        requestFour: {
          termo: '',
          tipoDeBusca: 'palavra',
        },
        requestFive: {
          termo: '',
          tipoDeBusca: 'palavra',
        },
      } );
    }
  }, [openInput] );

  const abortControllerRef = useRef<AbortController | null>( null );

  async function handleSearch( data: filtrosZodData ) {

    setLoading( true );
    setCompras( [] );


    abortControllerRef.current = new AbortController();


    const requests = {
      requestOne: data.requestOne,
      requestTwo: data.requestTwo,
      requestThree: data.requestThree,
      requestFour: data.requestFour,
      requestFive: data.requestFive,
    };

    // Filtra apenas as requests que têm termo preenchido
    const validRequests = Object.entries( requests ).reduce( ( acc, [key, value] ) => {
      if ( value && value.termo ) {
        acc[key] = {
          ...value,
          tipoDeBusca: value.tipoDeBusca || "palavra",
        };
      }
      return acc;
    }, {} as Record<string, { termo: string; tipoDeBusca: "palavra" | "frase" }> );


    const query = {
      ...validRequests, // Adiciona as requests válidas
      ano: data.ano || '',
      filtrarPor: data.filtrarPor || '',
      de: data.de || '',
      ate: data.ate || '',
      statusDaCompra: data.statusDaCompra || '',
      situacaoDaCompra: data.situacaoDaCompra || '',
      camposDeBusca: data.camposDeBusca || [],
      incluir: data.incluir || '',
      excluir: data.excluir || '',
    };

    // Remove valores vazios
    const filteredQuery = Object.fromEntries(
      Object.entries( query ).filter( ( [_, value] ) => {
        if ( Array.isArray( value ) ) {
          return value.length > 0;
        }
        if ( typeof value === 'object' ) {
          return Object.keys( value ).length > 0;
        }
        return value !== '';
      } )
    );


    // Converte o objeto para queryString
    const queryString = new URLSearchParams(
      Object.entries( filteredQuery ).reduce( ( acc, [key, value] ) => {
        if ( Array.isArray( value ) ) {
          acc[key] = value.join( ',' );
        } else if ( typeof value === 'object' ) {
          // Converte objetos de request em string
          acc[key] = JSON.stringify( value );
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string> )
    ).toString();






    async function makeIndividualRequest(
      requestData: { termo: string; tipoDeBusca: "palavra" | "frase" },
      commonData: Omit<filtrosZodData, 'requestOne' | 'requestTwo' | 'requestThree' | 'requestFour' | 'requestFive'>
    ) {


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
          },
          controller: abortControllerRef.current || undefined
        } );

        return result;
      } catch ( error: any ) {
        if ( error.name === 'AbortError' ) {
          setLoading( false ); // Para o loading
          return []; // Retorna array vazio em caso de abort
        }
        console.error( `Erro ao buscar com termo: ${requestData.termo}`, error );
        return [];
      }
    }

    // Dados comuns para todas as requisições
    const commonData = {
      ano: data.ano,
      filtrarPor: data.filtrarPor,
      de: data.de,
      ate: data.ate,
      statusDaCompra: data.statusDaCompra,
      situacaoDaCompra: data.situacaoDaCompra,
      camposDeBusca: data.camposDeBusca,
      incluir: data.incluir,
      excluir: data.excluir,
    };


    const reqs = Object.values( validRequests );
    const delay = ( ms: number ) => new Promise( resolve => setTimeout( resolve, ms ) );
    let allRequests: ComprasProps[] = [];
    try {
      for ( const request of reqs ) {

        if ( abortControllerRef.current?.signal.aborted ) {
          break;
        }

        const result = await makeIndividualRequest( request, commonData );
        if ( result ) {
          allRequests = [...allRequests, ...result];
          await delay( 1000 ); // Espera 1 segundo entre cada requisição
        }
      }

      if ( abortControllerRef.current ) {
        // Remove duplicatas
        allRequests = Array.from( new Set( allRequests ) );
        setCompras( allRequests );
        router.push( `/licitati?${queryString}` );
      }
    } catch ( error ) {
      console.error( 'Erro durante as requisições:', error );
    } finally {
      setLoading( false );
    }


    // Remove duplicatas (caso necessário)
    // allRequests = Array.from( new Set( allRequests ) );
    // // Atualiza o estado com todos os resultados
    // setCompras( allRequests );
    // setLoading( false );

    // // Atualiza a URL
    // router.push( `/licitati?${queryString}` );




    // // Faz todas as requisições em paralelo
    // const reqs = Object.values( validRequests );
    // const results = await Promise.all(
    //   reqs.map( request => makeIndividualRequest( request, commonData ) )
    // );

    // // Combina todos os resultados em um único array
    // allRequests = results.flat();
    // // Remove duplicatas (caso necessário)
    // allRequests = Array.from( new Set( allRequests ) );
    // // Atualiza o estado com todos os resultados
    // setCompras( allRequests );
    // setLoading( false );
    // // Atualiza a URL
    // router.push( `/licitati?${queryString}` )


  }


  async function handleReset() {
    reset();
    setCompras( [] );
    setLoading( false );
    router.push( '/licitati' );
  }


  async function abortRequest() {
    if ( abortControllerRef.current ) {
      abortControllerRef.current.abort();
    }
  }

  return (
    <form
      onSubmit={handleSubmit( handleSearch )}
      className="flex flex-col">
      <div className="border p-2 rounded-tr-md rounded-tl-md bg-neutral-100">
        <h5 className="text-16 font-normal">Definições de Busca</h5>
      </div>
      <div className="p-2 border border-t-0 flex flex-col gap-4">
        <TermSearch
          openInput={openInput}
          setOpenInput={setOpenInput}
          register={register} />
        <DateSearch register={register} />
        <StatusSearch register={register} />
      </div>
      <div className="mt-4">
        <div className="border p-2 rounded-tr-md rounded-tl-md bg-neutral-100">
          <h5 className="text-16 font-normal">Campos de busca</h5>
        </div>
        <FieldsSearch register={register} />
      </div>
      <div className="mt-4">
        <div className="border p-2 rounded-tr-md rounded-tl-md bg-neutral-100">
          <h5 className="text-16 font-normal">Filtro de busca avançado</h5>
        </div>
        <AdvancedSearch register={register} />
        <ButtonsSearch
          abortRequest={abortRequest}
          handleReset={handleReset}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}
