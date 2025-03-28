'use client'

import { UseFormRegister } from "react-hook-form";
import { generatePastYears } from "../util/generate-past-years";
import { filtrosZodData } from "./form-filters";
import { useSearchParams } from "next/navigation";


interface DateSearchProps {
  register: UseFormRegister<filtrosZodData>
}

export function DateSearch( { register }: DateSearchProps ) {

  const years = generatePastYears();
  const searchParams = useSearchParams();
  const searchParamsObj = Object.fromEntries( searchParams ) as unknown as filtrosZodData;

  const meses = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ];


  const mesInicio = searchParamsObj.de || '1';
  const mesFim = searchParamsObj.ate || '12';

  const filteredMesesFim = meses.filter( mes => Number( mes.value ) >= Number( mesInicio ) );
  const filteredMesesInicio = meses.filter( mes => Number( mes.value ) <= Number( mesFim ) );

  return (
    <div className="flex gap-4">
      <label htmlFor="" className="w-fit flex flex-col gap-2">
        Ano de compra:
        <select
          defaultValue={"2025"}
          {...register( "ano" )}
          className="w-full" >
          <option disabled value="">Ano</option>
          {years.map( ( ano ) => {
            return <option key={ano} value={ano}>{ano}</option>
          } )}
        </select>
      </label>
      <label htmlFor="" className="w-fit flex flex-col gap-2">
        Filtrar por:
        <select
          {...register( "filtrarPor" )}
          className="w-full" >
          <option value="">Data padrão</option>
          <option value="pncp">publicação PNCP</option>
          <option value="inicio-vigencia">Início Vigência</option>
          <option value="fim-vigencia">Fim Vigência</option>
        </select>
      </label>
      <label htmlFor="" className="w-fit flex flex-col gap-2">
        De:
        <select
          {...register( "de" )}
          className="w-full" >
          defaultValue={"1"}
          {filteredMesesInicio.map( ( mes ) => {
            return <option key={mes.value} value={mes.value}>{mes.label}</option>
          } )}
        </select>
      </label>
      <label htmlFor="" className="w-fit flex flex-col gap-2">
        Até:
        <select
          defaultValue={"12"}
          {...register( "ate" )}
          className="w-full " >
          {filteredMesesFim.map( ( mes ) => {
            return <option key={mes.value} value={mes.value}>{mes.label}</option>
          } )}
        </select>
      </label>
    </div>
  );
}
