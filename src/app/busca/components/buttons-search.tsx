interface ButtonsSearchProps {
  isSubmitting: boolean;
  handleReset: () => void;
  abortRequest: () => void;

}

export function ButtonsSearch( { abortRequest, handleReset, isSubmitting }: ButtonsSearchProps ) {
  return (
    <div className="py-4 items-end  flex  gap-4">
      <button type="submit" disabled={isSubmitting} className="px-6">{isSubmitting ? "Buscando..." : "Buscar"}</button>
      <button
        type="button"
        onClick={handleReset}
        className="px-6 bg-transparent border text-neutral-700">Limpar campos</button>
      {isSubmitting &&
        <button
          type="button"
          onClick={abortRequest}
          className="px-6 bg-transparent border border-red-400 text-red-500">Cancelar busca</button>}
    </div>
  );
}
