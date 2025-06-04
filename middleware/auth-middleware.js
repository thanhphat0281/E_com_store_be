const jwt = require('jsonwebtoken');

function veryfyToken(req, res, next) {
    // const authHeader = req.header("Authorization");
    // const token = authHeader.split(' ')[1];
    // console.log(token);
    // if (!token) {
    //     return res.status(401).send({
    //         error: "Access denied",
    //     });
    // }
    // try {
    //     const decode = jwt.verify(token, "secret");
    //     console.log(decode);
    // } catch (err) {
    //     return res.status(401).send({
    //         error: "Invalid token",
    //     });
    // }

    const authHeader = req.header("Authorization");

    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).send({ error: "Access denied" });
    }

    // Lấy token thật từ chuỗi "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: "Token missing" });
    }

    try {
        const decode = jwt.verify(token, "secret"); // Sửa lại chính tả ở đây
        req.user = decode;
        next();
    } catch (err) {
        return res.status(401).send({ error: "Invalid token" });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({
            error: "Forbidden",
        });
    }
}

module.exports = { veryfyToken, isAdmin };