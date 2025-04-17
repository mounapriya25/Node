module.exports = (req, res) => {
    console.log("Session Data:", req.session.usrdetails);
    res.json({ session: req.session.usrdetails || "No session found" });
};
