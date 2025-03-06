export function notFoundHandler(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist.");
}
