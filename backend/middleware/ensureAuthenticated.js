// function to check if user is authenticated
export async function ensureAuthenticated(req, res, next) {
    // returning a `next()` to move on if authenticated
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect(process.env.CLIENT_BASE_URL + "/login");
}