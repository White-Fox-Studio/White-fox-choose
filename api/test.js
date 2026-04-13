module.exports = function(req, res) {
  // 1. Проверяем, что функция вообще запустилась
  console.log("УРА! Запрос дошел до catalog.js");

  // 2. ОБЯЗАТЕЛЬНО возвращаем ответ, иначе будет вечный pending
  res.status(200).json({
    success: true,
    message: "Сервер работает!"
  });
};
