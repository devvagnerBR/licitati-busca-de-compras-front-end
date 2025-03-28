import { CodigosMaterialPacInterface } from "@/types/pac/codigo-material-pac";

interface CodigosMaterialPacListProps {
  codigos: CodigosMaterialPacInterface[]
}

export function CodigosMaterialPacList( { codigos }: CodigosMaterialPacListProps ) {


  const copyToClipboard = ( codigo: string ) => {
    navigator.clipboard.writeText( codigo ).then( () => {
    } ).catch( err => {
      console.error( 'Erro ao copiar o código: ', err );
    } );
  };

  if ( codigos.length === 0 ) return null
  return (
    <div className="rounded-md border p-2">
      <div className="flex gap-8">

        <div className="flex flex-col gap-2">
          <h3>Grupo:</h3>
          <div className="mt-4 flex flex-col gap-4">
            {codigos.map( ( codigo, index ) => (
              <div key={index}>
                <p className="text-neutral-400">{codigo.codigoGrupo}</p>
              </div>
            ) )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3>Classe:</h3>
          <div className="mt-4 flex flex-col gap-4">
            {codigos.map( ( codigo, index ) => (
              <div key={index}>
                <p className="text-neutral-400">{codigo.codigoClasse}</p>
              </div>
            ) )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3>Descrição:</h3>
          <div className="mt-4 flex flex-col gap-4">
            {codigos.map( ( codigo, index ) => (
              <div key={index}>
                <p className="text-neutral-400">{codigo.nomeClasse}</p>
              </div>
            ) )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="invisible">Copiar código</h3>
          <div className="mt-4 flex flex-col items-center justify-center gap-4">
            {codigos.map( ( codigo, index ) => (
              <div key={index} className="flex items-center justify-center">
                <button
                  onClick={() => copyToClipboard( codigo.codigoClasse.toString() )}
                  className="rounded-md text-14 bg-white text-cyan-500 underline decoration-blue-200 h-[27px] underline-offset-2">Copiar Código</button>
              </div>
            ) )}
          </div>
        </div>

      </div>
    </div>
  );
}
