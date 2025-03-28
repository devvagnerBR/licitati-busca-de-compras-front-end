'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps { }

export function Header( props: HeaderProps ) {

  const pathname = usePathname();
  const pathNameIsLicitati = pathname === "/busca";
  const pathNameIsPac = pathname === "/busca/pac";



  return (
    <div className=" px-4 py-4 flex justify-between border-b shadow-sm fixed top-0 left-0 right-0 bg-white z-10">
      <h2 className="font-medium">Licitati</h2>
      <div className="flex gap-8">
        <Link href="/busca/pac" className={`${pathNameIsPac && "text-neutral-900 border-b transition-all"} text-16`}>Pac</Link>
        <Link href="/busca" className={`${pathNameIsLicitati && "text-neutral-900 border-b transition-all"} text-16`}>Busca de Compras</Link>
      </div>
    </div>
  );
}
