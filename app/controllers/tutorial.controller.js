// CRUD FUNCTIONS Create,FindAll, FindOne, Update, Delete, DeleteAll, findAllPublished.
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

};

// Retrieve all tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single tutorial with an id
exports.findOne = (req, res) => {

};

// Update a tutorial by the id in the request
exports.update = (req, res) =>{

};

// Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete All tutorials from the database.
exports.deleteAll = (req, res) => {

};


// CREATE NEW OBJECT
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
	  res.status(400).send({
		message: "Content can not be empty!"
	  });
	  return;
	}
  
	// Create a Tutorial
	const tutorial = {
	  title: req.body.title,
	  description: req.body.description,
	  published: req.body.published ? req.body.published : false
	};
  
	// Save Tutorial in the database
	Tutorial.create(tutorial)
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while creating the Tutorial."
		});
	  });
  };

//   Retrieve objects(with condition)
  exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
	Tutorial.findAll({ where: condition })
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving tutorials."
		});
	  });
  };

//   retrieve a single object
exports.findOne = (req, res) => {
	const id = req.params.id;
  
	Tutorial.findByPk(id)
	  .then(data => {
		if (data) {
		  res.send(data);
		} else {
		  res.status(404).send({
			message: `Cannot find Tutorial with id=${id}.`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error retrieving Tutorial with id=" + id
		});
	  });
  };

//   Update an object
exports.update = (req, res) => {
	const id = req.params.id;
  
	Tutorial.update(req.body, {
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "Tutorial was updated successfully."
		  });
		} else {
		  res.send({
			message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error updating Tutorial with id=" + id
		});
	  });
  };

//   DELETE AN OBJECT
exports.delete = (req, res) => {
	const id = req.params.id;
  
	Tutorial.destroy({
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "Tutorial was deleted successfully!"
		  });
		} else {
		  res.send({
			message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Could not delete Tutorial with id=" + id
		});
	  });
  };

//   DELETE ALL OBJECTS
  exports.deleteAll = (req, res) => {
	Tutorial.destroy({
	  where: {},
	  truncate: false
	})
	  .then(nums => {
		res.send({ message: `${nums} Tutorials were deleted successfully!` });
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while removing all tutorials."
		});
	  });
  };

//   FIND ALL OBJECTS BY CONDITION
exports.findAllPublished = (req, res) => {
	Tutorial.findAll({ where: { published: true } })
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving tutorials."
		});
	  });
  };