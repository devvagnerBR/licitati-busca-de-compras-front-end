import moment from "moment";

export function generatePastYears() {

  const currentYear = moment().year();
  const years = [];
  for ( let i = 2022; i <= currentYear; i++ ) {
    years.push( i );
  }

  return years;
}