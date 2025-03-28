'use server'

import { CodigosMaterialPacInterface } from "@/types/pac/codigo-material-pac";



interface ItemPACCodeProps {
  search: string;
}

export async function getMaterialItemPACCode( { search }: ItemPACCodeProps ) {
  //https://cnbs.estaleiro.serpro.gov.br/cnbs-api/material/v1/palavra?palavra=nuvem
  //https://cnbs.estaleiro.serpro.gov.br/cnbs-api/servico/v1/palavra?palavra=nuvem


  const url = `https://cnbs.estaleiro.serpro.gov.br/cnbs-api/material/v1/palavra?palavra=${search}`;
  // const url = `https://cnbs.estaleiro.serpro.gov.br/cnbs-api/material/v1/palavra?palavra=${search}`;
  const response = await fetch( url );
  const data = await response.json() as CodigosMaterialPacInterface[];


  return data;
}
