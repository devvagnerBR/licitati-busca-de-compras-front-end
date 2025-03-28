'use client'
import { Suspense } from 'react'
import { useState } from "react";
import { FormFilters } from "./form-filters";
import { ComprasProps } from "../types/compra";
import { ListCompras } from "./list-compras";

interface LicitatiClientSideProps { }

export function LicitatiClientSide() {


  const [compras, setCompras] = useState<ComprasProps[]>( [] );
  const [loading, setLoading] = useState<boolean>( false );

  return (
    <Suspense>
      <div className="p-4 flex flex-col gap-4 mt-4">
        <h1 className="text-18 text-neutral-800">Busca por compras</h1>
        <FormFilters
          setLoading={setLoading}
          setCompras={setCompras} />
        <ListCompras
          loading={loading}
          setCompras={setCompras}
          compras={compras} />
      </div>
    </Suspense>
  );
}
