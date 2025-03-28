'use client'


import { BuscarCodigoPac } from "./busca-codigo/buscar-codigo-pac";
import { useState } from "react";
import { CodigosPacInterface } from "@/types/pac/codigo-pac";
import { CodigosPacList } from "./busca-codigo/codigos-pac-list";
import { BuscaItensPACWrapper } from "./busca-itens-pac/busca-itens-pac-wrapper";
import { ITEM_PAC_INTERFACE } from "@/types/pac/item";
import { ItensPacList } from "./busca-itens-pac/itens-pac-list";
import { searchItemPac } from "@/actions/pac/search-item";
import { BuscarCodigoPacMaterial } from "./busca-codigo/busca-material";
import { CodigosMaterialPacInterface } from "@/types/pac/codigo-material-pac";
import { CodigosMaterialPacList } from "./busca-codigo/codigos-material-pac-list";

export function PacPageWrapper() {

  // ------------------------------ Busca por código ------------------------------
  const [itemBusca, setItemBusca] = useState<string>( '' );
  const [itemBuscaMaterial, setItemBuscaMaterial] = useState<string>( '' );
  const [servicocodigosPac, setServicoCodigosPac] = useState<CodigosPacInterface[]>( [] );
  const [materialCodigosPac, setMaterialCodigosPac] = useState<CodigosMaterialPacInterface[]>( [] );

  // ------------------------------ Serviço ------------------------------

  async function handleChangeServico( event: React.ChangeEvent<HTMLInputElement> ) {
    setItemBusca( event.target.value );
  }

  // função para setar os codigos encontrados em um array;
  async function handleSetServicoCodigosPac( data: CodigosPacInterface[] ) {
    setServicoCodigosPac( data );
    setMaterialCodigosPac( [] );
  }

  // ------------------------------ Material ------------------------------
  async function handleChangeMaterial( event: React.ChangeEvent<HTMLInputElement> ) {
    setItemBuscaMaterial( event.target.value );
  }

  async function handleSetMaterialCodigosPac( data: any ) {
    setMaterialCodigosPac( data );
    setServicoCodigosPac( [] );
  }

  // ------------------------------ Lista de Compras ------------------------------

  async function handleSetItensPac( data: ITEM_PAC_INTERFACE ) {
    setItensPac( data );
  }

  // ------------------------------ Busca por item PAC ------------------------------
  const [form, setForm] = useState( {
    anoPca: '',
    codigo: '',
    valorMax: '',
    valorMin: '',
    q: ""
  } );

  const [currentPage, setCurrentPage] = useState<number>( 1 );
  const [typeButton, setTypeButton] = useState<string>( '' );
  const [itensPac, setItensPac] = useState<ITEM_PAC_INTERFACE>( {
    empty: true,
    numeroPagina: 0,
    paginasRestantes: 0,
    totalPaginas: 0,
    totalRegistros: 0,
    data: []
  } );

  async function fetchItens( page: number ) {
    const data = await searchItemPac( { anoPca: form.anoPca, codigo: form.codigo, page: page.toString(), valorMin: form.valorMin, valorMax: form.valorMax } );
    setItensPac( data );
  }



  function handleNextPage() {
    const nextPage = currentPage + 1;
    setCurrentPage( nextPage );
    fetchItens( nextPage );
  }

  function handlePreviousPage() {
    const previousPage = currentPage - 1;
    setCurrentPage( previousPage );
    fetchItens( previousPage );
  }

  const [loading, setLoading] = useState<boolean>( false );
  async function toggleLoading( state: boolean ) {
    setLoading( state );
  }



  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4">
        <BuscarCodigoPac
          itemBusca={itemBusca}
          handleChange={handleChangeServico}
          handleSetCodigosPac={handleSetServicoCodigosPac} />
        < BuscarCodigoPacMaterial
          itemBusca={itemBuscaMaterial}
          handleChange={handleChangeMaterial}
          handleSetCodigosPac={handleSetMaterialCodigosPac} />
        {servicocodigosPac && <CodigosPacList codigos={servicocodigosPac} />}
        {materialCodigosPac && <CodigosMaterialPacList codigos={materialCodigosPac} />}
      </div>
      <BuscaItensPACWrapper
        form={form}
        setForm={setForm}
        currentPage={currentPage}
        onSetLoading={toggleLoading}
        handleSetItensPac={handleSetItensPac} />
      <ItensPacList
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handleSetItensPac={handleSetItensPac}
        loading={loading}
        search={form.q}
        itens={itensPac} />
    </div>
  );
}
