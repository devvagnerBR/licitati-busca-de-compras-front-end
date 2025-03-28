export interface ComprasFiltradasProps {
    ano: "2022" | "2023" | "2024" | "2025";
    itemNome?: string;
    valorMin?: string;
    valorMax?: string;
    searchedPage?: number;
}

export default async function GetComprasFiltradasPelosItens( { ano, itemNome = "notebook", valorMax, valorMin, searchedPage }: ComprasFiltradasProps ) {

    // const baseURL = "https://apk-backend-xvv2.onrender.com"

    // const baseURL = 'https://licitati-api-2eea88721a2f.herokuapp.com'
    const baseURL = process.env.NEXT_PUBLIC_URL
    const mountedURL = `${baseURL}/compra/itens?ano=${ano}&itemNome=${itemNome}&valorMin=${valorMin}&valorMax=${valorMax}&search=${searchedPage}`;

    try {

        const response = await fetch(
            mountedURL,
            {
                method: "GET",
                headers: { "Content-Type": "application/json", },
            } );

        if ( !response.ok ) throw new Error( `HTTP error! status: ${response.status}` );

        const { data, searchedPage } = await response.json();

        if ( !data ) return [];
        return { data, searchedPage };

    } catch ( error: any ) {

        console.error( error );
        return [];

    }



}