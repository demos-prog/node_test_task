export function validateId(req, res, next) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  next();
}
