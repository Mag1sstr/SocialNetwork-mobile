export function notFound(req, res) {
  res.status(404).json({
    message: `Маршрут ${req.method} ${req.originalUrl} не найден`,
    code: "NOT_FOUND",
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    message: "Внутренняя ошибка сервера",
    code: "INTERNAL_ERROR",
  });
}
