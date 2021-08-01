var express = require('express');
var router = express.Router();
var createError = require('http-errors')

const todos = [{
    id: 1, 
    name: "do this",
    completed: false
}];

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  res.json(todos);
});

router.get('/:id,', function(req, res, next) {
  const foundTodo = todos.find(todo => todo.id === Number(req.params.id));

  if (!foundTodo)  {
    return next(createError(404, 'Not Found'));
  }

  res.json(foundTodo)
});

module.exports = router;