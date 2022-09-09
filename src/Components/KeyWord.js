export default function KeyWord(props) {
  const { filterByText, stringToHighlight } = props;

  // console.log(stringToHighlight);
  const regex = new RegExp(filterByText);

  if (filterByText && stringToHighlight.match(regex)) {
    const parts = stringToHighlight.split(filterByText);
    return (
      <span className="keyword">
        {parts[0]}
        <span className="highlight">{filterByText}</span>
        {parts[1]}
        &nbsp;
      </span>
    );
  } else return <>{stringToHighlight}&nbsp;</>;
}
