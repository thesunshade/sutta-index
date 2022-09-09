export default function addFilterHighlight(filterByText, stringToHighlight) {
  if (filterByText && stringToHighlight.match(new RegExp(filterByText))) {
    return stringToHighlight.replace(filterByText, "$`<span className='highlight'>" + filterByText + "</span>$'");
  } else return stringToHighlight;
}
