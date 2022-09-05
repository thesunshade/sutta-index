export default function removeTags(string, array) {
  return array
    ? string
        .split("<")
        .filter(function (val) {
          return f(array, val);
        })
        .map(function (val) {
          return f(array, val);
        })
        .join("")
    : string
        .split("<")
        .map(function (d) {
          return d.split(">").pop();
        })
        .join("");
  function f(array, value) {
    return array
      .map(function (d) {
        return value.includes(d + ">");
      })
      .indexOf(true) != -1
      ? "<" + value
      : value.split(">")[1];
  }
}
