export default function Favorites(props) {
  const { lastClickedLink } = props;
  return (
    <div>
      <button>Add</button> <code>{lastClickedLink}</code>
    </div>
  );
}
