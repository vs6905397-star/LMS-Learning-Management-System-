import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    try {
        
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: " not authenticated"
            })
        };

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(500).json({
            success:  false,
            message: "invalid or expired token"
        })
    }
}

export default authMiddleware;