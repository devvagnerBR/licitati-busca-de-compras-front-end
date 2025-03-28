'use client'


import { searchItemPac } from "@/actions/pac/search-item";
import { ITEM_PAC_INTERFACE } from "@/types/pac/item";
import { useState, useEffect } from 'react';

interface BuscaItensWrapperProps {
  handleSetItensPac: ( data: ITEM_PAC_INTERFACE ) => void;
  currentPage: number;
  form: {
    anoPca: string;
    codigo: string;
    valorMax: string;
    valorMin: string;
    q: string
  }
  onSetLoading: ( value: boolean ) => void;
  setForm: ( data: any ) => void;
}

export function BuscaItensPACWrapper( { onSetLoading, form, setForm, handleSetItensPac, currentPage }: BuscaItensWrapperProps ) {

  async function handleSubmit( event: React.FormEvent<HTMLFormElement> ) {
    onSetLoading( true );
    event.preventDefault();
    const data = await searchItemPac( { anoPca: form.anoPca, codigo: form.codigo, page: currentPage.toString(), valorMin: form.valorMin, valorMax: form.valorMax } );
    handleSetItensPac( data );
    onSetLoading( false );
  }

  function handleChange( event: React.ChangeEvent<HTMLInputElement> ) {
    setForm( {
      ...form, [event.target.name]: event.target.value
    } );
  }

  useEffect( () => {
    async function requestNewItens() {
      const data = await searchItemPac( { anoPca: form.anoPca, codigo: form.codigo, page: currentPage.toString(), valorMin: form.valorMin, valorMax: form.valorMax } );
      handleSetItensPac( data );
    }
    if ( currentPage > 1 ) {
      requestNewItens();
    }
  }, [currentPage] )

  return (
    <div className="mt-8">
      <h1 className="text-28 font-bold">Buscar item:</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-4">
        <div className="flex gap-2">
          <label className="flex flex-col gap-1 font-semibold text-neutral-600">
            Ano Pca:
            <input
              value={form.anoPca}
              onChange={handleChange}
              name="anoPca"
              type="text"
              className="h-[47px] rounded-md border pl-2 transition-colors focus:border-neutral-400" />
          </label>
          <label className="flex flex-col gap-1 font-semibold text-neutral-600">
            Código:
            <input
              value={form.codigo}
              onChange={handleChange}
              name="codigo"
              type="text"
              className="h-[47px] rounded-md border pl-2 transition-colors focus:border-neutral-400" />
          </label>
        </div>
        <div className="flex gap-2">
          <label className="flex flex-col gap-1 font-semibold text-neutral-600">
            Valor Mínimo:
            <input
              value={form.valorMin}
              onChange={handleChange}
              name="valorMin"
              type="number"
              className="h-[47px] rounded-md border pl-2 transition-colors focus:border-neutral-400" />
          </label>
          <label className="flex flex-col gap-1 font-semibold text-neutral-600">
            Valor Máximo:
            <input
              value={form.valorMax}
              onChange={handleChange}
              name="valorMax"
              type="number"
              className="h-[47px] rounded-md border pl-2 transition-colors focus:border-neutral-400" />
          </label>
        </div>
        <label className="flex w-fit flex-col gap-1 font-semibold text-neutral-600">
          Filtre a busca por:
          <p className="text-14">Esse campo irá filtrar os itens nessa página pelo nome do item.</p>
          <input
            value={form.q}
            placeholder="nobreak, computador, etc"
            onChange={handleChange}
            name="q"
            type="text"
            className="mt-2 h-[47px] rounded-md border pl-2 text-neutral-600 transition-colors placeholder:font-light focus:border-neutral-400" />
        </label>
        <button
          type="submit"
          disabled={form.anoPca === '' || form.codigo === ''}
          className="h-[47px] w-fit rounded-md border border-neutral-400 bg-neutral-200 px-4 text-neutral-600 disabled:cursor-not-allowed disabled:bg-neutral-400">
          Buscar itens
        </button>
      </form>
    </div>
  );
}
