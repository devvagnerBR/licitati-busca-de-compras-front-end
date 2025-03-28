'use client'

import { usePathname } from "next/navigation";

interface HeaderProps { }

export function Header( props: HeaderProps ) {

  const pathname = usePathname();
  const pathNameIsLicitati = pathname === "/licitati";
  const pathNameIsPac = pathname === "/pac";


  return (
    <div className=" px-4 py-4 flex justify-between border-b shadow-sm fixed top-0 left-0 right-0 bg-white z-10">
      <h2 className="font-medium">Licitati</h2>
      <div className="flex gap-8">
        <a href="/pac" className={`${pathNameIsPac && "text-neutral-900 border-b transition-all"} text-16`}>Pac</a>
        <a href="/licitati" className={`${pathNameIsLicitati && "text-neutral-900 border-b transition-all"} text-16`}>Busca de Compras</a>
      </div>
    </div>
  );
}
