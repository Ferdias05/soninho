const connection = require("./db.js")
const express = require("express") // importando biblioteca
const steam = express() // Instanciamos o objeto para usarmos a biblioteca

steam.use(express.json())

steam.get("/", (req, res) => {
    res.send("Pagina inicial")
})

steam.get("/:id", async (req, res) => {
	try{
		let query = `
		SELECT *
    	FROM games g
    	JOIN user u ON g.id = u.games
    	WHERE u.id = ${req.params.id}
		`
		let jogoPorId = await connection.connection.promise().query(query)
		res.status(200).send(jogoPorId)
	} catch(err) {
		console.log(err)
	}
})

steam.get("/jogos", async (req, res) => {
	try {
		let result = await connection.connection.promise().query("SELECT * FROM games")
		res.status(200).send(result);
	} catch(err) {
		console.log(err);
	}
});

steam.post("/jogos", async (req, res) => {
	try {
		const {title, tag} = req.body
		let jogos = await connection.connection.promise().query(`insert into games (title, tag) values (?, ?)`, [title, tag])
		res.status(200).send(jogos)
	} catch (err) {
		console.log(err)
	}
})

steam.post("/tag", async (req, res) => {
	try {
		const {tagName} = req.body
		let tag = await connection.connection.promise().query(`insert into tag (tagName) values (?)`, [tagName])
		res.status(200).send(tag)
	} catch (err) {
		console.log(err)
	}
})

steam.put("/update/:id", async (req, res) => {
	try {
		const id = req.params.id
		const {gameTitle} = req.body
		let update = await connection.connection.promise().query(`
			UPDATE games
			SET title = (?)
			WHERE games.id = (?)	
		`, [gameTitle, id])
		res.status(200).send(update)
	} catch (err) {
		console.log(err)
	}
})

steam.delete("/delete/:id", async (req, res) => {
	try{
		const idJogo = req.params.id
		let deleteGame = await connection.connection.promise().query(`DELETE FROM games WHERE id = (?)`, [idJogo])
		res.status(200).send(deleteGame) 
	} catch (err) {
		console.log(err)
	}
})

steam.delete("/delete/tag/:id", async (req, res) => {
	try{
		const idTag = req.params.id
		let deleteTag = await connection.connection.promise().query(`DELETE FROM tag WHERE id = (?)`, [idTag])
		res.status(200).send(deleteTag) 
	} catch (err) {
		console.log(err)
	}
})


steam.listen(3000, () => {
	console.log("Steam 2.0 rodando na porta 3000.");
});