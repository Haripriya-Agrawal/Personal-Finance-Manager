const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		// Check if user exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(401).send({ message: "Invalid email or password" });

		// Validate password
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) return res.status(401).send({ message: "Invalid email or password" });

		// Generate JWT token
		const token = jwt.sign(
			{ _id: user._id, email: user.email }, 
			process.env.JWT_SECRET || "your_jwt_secret", 
			{ expiresIn: "1h" }
		);

		res.status(200).send({ message: "Login successful", token });
	} catch (error) {
		console.error("Error in user login:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
