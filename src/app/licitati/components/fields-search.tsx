'use client'

import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { filtrosZodData } from "./form-filters";
import { useSearchParams } from "next/navigation";

interface FieldsSearchProps {
  register: UseFormRegister<filtrosZodData>;
}

export function FieldsSearch( { register }: FieldsSearchProps ) {
  const searchParams = useSearchParams();
  const searchParamsObj = Object.fromEntries( searchParams ) as Partial<filtrosZodData>;

  const [fields, setFields] = useState( [
    {
      name: "detalhes da compra",
      value: "detalhes",
      selected: true, // Marcado inicialmente
    },
    {
      name: "itens",
      value: "itens",
      selected: true, // Marcado inicialmente
    },
    {
      name: "arquivos",
      value: "arquivos",
      selected: true, // Marcado inicialmente
    },
    {
      name: "outros",
      value: "outros",
      selected: false,
    },
  ] );

  // Sincroniza o estado inicial de `fields` com os valores de `camposDeBusca`
  useEffect( () => {
    const camposDeBusca = Array.isArray( searchParamsObj.camposDeBusca )
      ? searchParamsObj.camposDeBusca
      : ( searchParamsObj.camposDeBusca || "" ).split( "," ).filter( ( v ) => v.trim() !== "" );

    setFields( ( prevFields ) =>
      prevFields.map( ( field, index ) => ( {
        ...field,
        selected: camposDeBusca.length > 0
          ? camposDeBusca.includes( field.value )
          : index < 3, // Marca os 3 primeiros se `camposDeBusca` estiver vazio
      } ) )
    );
  }, [searchParams] );

  const handleCheckboxChange = ( value: string ) => {
    setFields( ( prevFields ) =>
      prevFields.map( ( field ) =>
        field.value === value ? { ...field, selected: !field.selected } : field
      )
    );
  };

  return (
    <div className="p-2 border border-t-0 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {fields.map( ( field ) => {
          return (
            <label
              key={field.value}
              className="h-[20] flex items-center gap-2 font-light text-18 capitalize"
            >
              <input
                {...register( "camposDeBusca" )}
                value={field.value}
                type="checkbox"
                checked={field.selected} // Agora usa o estado sincronizado
                onChange={() => handleCheckboxChange( field.value )}
                className="w-4 accent-cyan-500"
              />
              {field.name}
            </label>
          );
        } )}
      </div>
    </div>
  );
}