const { todo } = require("../../models");

// Get all todo based on category
exports.getTodosCategory = async (req, res) => {
  try {
    const { category } = req.params;

    let response = await todo.findAll({
      where: {
        category,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    response = JSON.parse(JSON.stringify(response));

    res.send({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// Get all todo based on status
exports.getTodosStatus = async (req, res) => {
  try {
    const { status } = req.params;

    let response = await todo.findAll({
      where: {
        status,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    response = JSON.parse(JSON.stringify(response));

    res.send({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// Get one todo
exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await todo.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!response) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    res.send({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// Add todo
exports.addTodo = async (req, res) => {
  try {
    const dataBody = req.body;

    const response = await todo.create(dataBody);

    let data = await todo.findOne({
      where: {
        id: response.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// Edit todo
exports.editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBody = req.body;

    const findTodo = await todo.findOne({
      where: {
        id,
      },
    });

    if (!findTodo) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    await todo.update(dataBody, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        id,
        dataBody,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const findTodo = await todo.findOne({
      where: {
        id,
      },
    });

    if (!findTodo) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    const response = await todo.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
