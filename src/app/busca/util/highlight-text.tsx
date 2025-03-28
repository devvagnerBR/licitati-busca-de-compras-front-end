export function highlightText( text: string, searchTerms: string[] ) {
  if ( !text || !searchTerms.length ) return text;

  let highlightedText = text;

  searchTerms.forEach( term => {
    if ( !term ) return;

    const regex = new RegExp( `(${term})`, 'gi' );

    highlightedText = highlightedText.replace(
      regex,
      '<mark class="bg-green-300">$1</mark>'
    );

  } );

  return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
}