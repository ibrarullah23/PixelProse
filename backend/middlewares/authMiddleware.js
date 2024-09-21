import jsonwebtoken  from 'jsonwebtoken';

export default async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'You are not authenticated!',
            error: "Unauthorized"
        });
    }

    try {
        const decoded =  jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token is not valid!',
            error: error.message
        });
    }
}

export const getMe = async(req, res, next)=>{
    
    req.params.username = req.user.username

    next();

}
