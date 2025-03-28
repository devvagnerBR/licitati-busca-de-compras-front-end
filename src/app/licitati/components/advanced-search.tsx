import { UseFormRegister } from "react-hook-form";
import { filtrosZodData } from "./form-filters";

interface AdvancedSearchProps {
  register: UseFormRegister<filtrosZodData>
}

export function AdvancedSearch( { register }: AdvancedSearchProps ) {
  return (
    <div className="p-2 items-end border border-t-0 flex  gap-4">
      <label htmlFor="" className="flex flex-col gap-2">
        Incluir:
        <input
          {...register( "incluir" )}
          type="text" />
      </label>
      <label htmlFor="" className="flex flex-col gap-2">
        Excluir:
        <input
          {...register( "excluir" )}
          type="text" />
      </label>
      {/* <button type="button" className="px-6">Filtrar</button> */}
    </div>
  );
}
