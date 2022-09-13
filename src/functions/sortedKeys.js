export default function sortedKeys(object) {
  return Object.keys(object).sort((a, b) => {
    a = a.replace("“", "");
    b = b.replace("“", "");
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });
}
// export default function sortedKeys(object) {
//   return Object.keys(object).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
// }

// x.sort(function(a, b){
//   a = a.replace(/[-]/, '.');
//   b = b.replace(/[-]/, '.');
//   if( parseInt(a) < parseInt(b) ) return -1;
//   if( parseInt(a) > parseInt(b) ) return 1;
//   return 0;
// });
