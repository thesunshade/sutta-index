export default function randomSuggestion() {
  const suggestion = [
    "Dhamma",
    "food",
    "advice",
    "monastic",
    "anger",
    "love",
    "conflict",
    "arahant",
    "blame",
    "recollection",
    "meditation",
    "ghosts",
  ];

  const random = Math.floor(Math.random() * suggestion.length);
  return suggestion[random];
}
