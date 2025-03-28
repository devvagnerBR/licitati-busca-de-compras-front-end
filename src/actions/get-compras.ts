

import { filtrosZodData } from "@/app/busca/components/form-filters";

export interface UniqueCompraProps {
  query: {
    termo: string;
    tipoDeBusca: string;
    ano: string;
    statusDaCompra: string;
    filtrarPor: string;
    de: string;
    ate: string;
    situacaoDaCompra: string;
    camposDeBusca: string[];
    incluir: string;
    excluir: string;
  },

  controller?: AbortController;

}

export async function getCompras( { query, controller }: UniqueCompraProps ) {

  const URL = process.env.NEXT_PUBLIC_URL

  try {

    const {
      termo, tipoDeBusca, ano, statusDaCompra,
      filtrarPor, de, ate, situacaoDaCompra,
      camposDeBusca, incluir, excluir

    } = query;

    const fetchURL = `${URL}/v2/compra?page=1&limit=100&documentType=edital&statusDaCompra=${statusDaCompra}&termo=${termo}&ano=${ano}&tipoDeBusca=${tipoDeBusca}&filtrarPor=${filtrarPor}&de=${de}&ate=${ate}&situacaoDaCompra=${situacaoDaCompra}&camposDeBusca=${camposDeBusca}&incluir=${incluir}&excluir=${excluir}`
    const response = await fetch( fetchURL, {
      method: 'GET',
      signal: controller?.signal,

      headers: { 'Content-Type': 'application/json' },
      cache: "force-cache"
    } )

    const data = await response.json()
    return data

  } catch ( error ) {
    console.log( error )
  }


}