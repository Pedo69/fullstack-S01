const exprees = require('express');
const Sequelize = require('sequelize');
const app = exprees();

app.use(exprees.json());

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './Database/Books.sqlite'
});

app.get("/", (req, res) => {
  res.send("Hello World Apicha!");
});

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();

app.get('/books', (req,res) => {
    Book.findAll().then(books => {
        res.json(books);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/book/:id', (req,res) => {
    Book.findByPk(req.params.id).then(book => {
        if(!book) {
            res.status(404).json({error: "Book not found"});
        } else {
            res.json(book);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/books', (req,res) => {
    Book.create(req.body).then(book => {
        res.json(book);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/books/:id', (req,res) => {
    Book.findByPk(req.params.id).then(book => {
        if(!book) {
            res.status(404).json({error: "Book not found"});
        } else {
            book.update(req.body).then(() => {
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/book/:id', (req,res) => {
    Book.findByPk(req.params.id).then(book => {
        if(!book) {
            res.status(404).json({error: "Book not found"});
        } else {
            book.destroy().then(() => {
                res.json({message: "Book deleted successfully"});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}...`));