import { UseFormRegister } from "react-hook-form";
import { filtrosZodData } from "./form-filters";

interface StatusSearchProps {
  register: UseFormRegister<filtrosZodData>
}

export function StatusSearch( { register }: StatusSearchProps ) {
  return (
    <div className="flex gap-4 items-end">
      <label htmlFor="" className="w-fit flex flex-col gap-2">
        Especifique o status de compra:
        <select
          {...register( "statusDaCompra" )}
          className="w-full" >
          <option value="todos">Todos</option>
          <option value="recebendo_proposta">Recebendo proposta</option>
          <option value="vigente">Vigente</option>
          <option value="concluido">Concluído</option>
        </select>
      </label>
      <label htmlFor="" className="w-fit flex flex-col gap-2">
        Situação de compra:
        <select
          {...register( "situacaoDaCompra" )}
          className="w-full" >
          <option value="0">Todos</option>
          <option value="1">Publicado no PNCP</option>
          <option value="2">Revogado</option>
          <option value="3">Anulada</option>
          <option value="4">Suspensa</option>
        </select>
      </label>
    </div>
  );
}
