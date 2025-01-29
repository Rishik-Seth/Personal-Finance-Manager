export default (err, req, res, next) => {    
    console.log("Error: ",err.message);
    res.status(500).send("Something broke!");
}