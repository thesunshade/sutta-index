export default function KeyWord(props) {
  const { filterByText, stringToHighlight } = props;
  const regex = new RegExp(filterByText, "i");

  if (filterByText && stringToHighlight.match(regex)) {
    const parts = stringToHighlight.split(regex);
    const actualFoundFilterText = regex.exec(stringToHighlight); // because while the search is case sensitive, we want to highlight the actual found text, not the filterByText
    return (
      <span className="keyword">
        {parts[0]}
        <span className="highlight">{actualFoundFilterText[0]}</span>
        {parts[1]}
        &nbsp;
      </span>
    );
  } else return <>{stringToHighlight}&nbsp;</>;
}
