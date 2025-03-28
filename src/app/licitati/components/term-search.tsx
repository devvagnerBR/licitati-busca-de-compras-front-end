'use client'

import { UseFormRegister } from "react-hook-form";
import { filtrosZodData } from "./form-filters";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";

interface TermSearchProps {
  register: UseFormRegister<filtrosZodData>
  openInput: boolean;
  setOpenInput: ( value: boolean ) => void;
}

export function TermSearch( { openInput, setOpenInput, register }: TermSearchProps ) {


  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-end">
        <label htmlFor="" className="flex flex-col gap-2">
          Busque por termo:
          <input
            {...register( "requestOne.termo" )}
            type="text" />
        </label>
        <label htmlFor="" className="w-fit flex flex-col gap-2">
          Tipo de busca:
          <select
            {...register( "requestOne.tipoDeBusca" )}
            className="w-full">
            <option value="palavra">Palavra</option>
            <option value="frase">Frase exata</option>
          </select>
        </label>
        <div
          onClick={() => setOpenInput( !openInput )}
          className="border border-neutral-300 group h-[42px] flex items-center px-4 cursor-pointer">
          {openInput ? < MinusCircle size={28} className="text-cyan-300 group-hover:scale-110 transition-all" /> : < PlusCircle size={28} className="text-cyan-400 group-hover:scale-110 transition-all" />}
        </div>
      </div>


      {openInput &&
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-end">
            <label htmlFor="" className="flex flex-col gap-2">
              Busque por termo:
              <input
                {...register( "requestTwo.termo" )}
                type="text" />
            </label>
            <label htmlFor="" className="w-fit flex flex-col gap-2">
              Tipo de busca:
              <select
                {...register( "requestTwo.tipoDeBusca" )}
                className="w-full">
                <option value="palavra">Palavra</option>
                <option value="frase">Frase exata</option>
              </select>
            </label>
          </div>
          <div className="flex gap-4 items-end">
            <label htmlFor="" className="flex flex-col gap-2">
              Busque por termo:
              <input
                {...register( "requestThree.termo" )}
                type="text" />
            </label>
            <label htmlFor="" className="w-fit flex flex-col gap-2">
              Tipo de busca:
              <select
                {...register( "requestThree.tipoDeBusca" )}
                className="w-full">
                <option value="palavra">Palavra</option>
                <option value="frase">Frase exata</option>
              </select>
            </label>
          </div>
          <div className="flex gap-4 items-end">
            <label htmlFor="" className="flex flex-col gap-2">
              Busque por termo:
              <input
                {...register( "requestFour.termo" )}
                type="text" />
            </label>
            <label htmlFor="" className="w-fit flex flex-col gap-2">
              Tipo de busca:
              <select
                {...register( "requestFour.tipoDeBusca" )}
                className="w-full">
                <option value="palavra">Palavra</option>
                <option value="frase">Frase exata</option>
              </select>
            </label>
          </div>
          <div className="flex gap-4 items-end">
            <label htmlFor="" className="flex flex-col gap-2">
              Busque por termo:
              <input
                {...register( "requestFive.termo" )}
                type="text" />
            </label>
            <label htmlFor="" className="w-fit flex flex-col gap-2">
              Tipo de busca:
              <select
                {...register( "requestFive.tipoDeBusca" )}
                className="w-full">
                <option value="palavra">Palavra</option>
                <option value="frase">Frase exata</option>
              </select>
            </label>
          </div>

        </div>}

    </div>
  );
}
