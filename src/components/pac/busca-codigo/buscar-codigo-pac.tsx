import { getItemPACCode } from "@/actions/pac/search-item-code";
import { CodigosPacInterface } from "@/types/pac/codigo-pac";


interface BuscarCodigoPacProps {
  itemBusca: string;
  handleChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
  handleSetCodigosPac: ( data: CodigosPacInterface[] ) => void;
}


export function BuscarCodigoPac( { itemBusca, handleChange, handleSetCodigosPac }: BuscarCodigoPacProps ) {


  async function handleSubmit( event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();

    const data = await getItemPACCode( { search: itemBusca } )
    if ( Array.isArray( data ) ) {
      handleSetCodigosPac( data );
    }
  }

  return (
    <div className="mt-2 flex w-fit flex-col gap-4 rounded-md p-2 shadow-sm">
      <h1 className="text-28 font-bold">Buscar por serviço:</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex h-[47px] gap-2">
          <input
            value={itemBusca}
            onChange={handleChange}
            name=""
            type="text"
            className="h-full rounded-md border pl-2 transition-colors focus:border-neutral-400" />
          <button
            disabled={itemBusca.length === 0}
            type="submit"
            className="h-full rounded-md border border-neutral-400 bg-neutral-200 px-4 text-neutral-600 disabled:cursor-not-allowed disabled:bg-neutral-400">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}
