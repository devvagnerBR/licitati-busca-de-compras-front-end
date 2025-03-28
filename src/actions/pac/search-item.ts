'use server'

import { ITEM_PAC_INTERFACE } from "@/types/pac/item";

interface SearchItemPacProps {
  codigo: string;
  anoPca: string;
  page?: string;
  valorMin?: string;
  valorMax?: string;
}

export async function searchItemPac( { anoPca, codigo, page = "1", valorMin, valorMax }: SearchItemPacProps ) {

  //https://pncp.gov.br/api/pncp/v1/orgaos/15158665000103/pca/2025/consolidado/unidades?pagina=1&tamanhoPagina=5

  const url = process.env.NEXT_PUBLIC_URL
  const fetchURL = `${url}/pca/itens?anoPCA=${anoPca}&code=${codigo}&page=${page}&valorMin=${valorMin}&valorMax=${valorMax}`;


  const response = await fetch( fetchURL, {
    method: "GET",
    headers: { "Content-Type": "application/json", }
  } );

  const data = await response.json() as ITEM_PAC_INTERFACE;

  return data;
}
