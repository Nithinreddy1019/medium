import { verify } from "hono/jwt";
import app from "../src";

const authMiddleware = async (c: any, next: any) => {
    const token = c.req.header("authorization");
    if(!token || !token.startsWith("Bearer")){
        c.status(403)
        return c.json({message: "Unauthorized"})
    };

    const toAuth = token?.split(" ")[1];
    
    const decoded = await verify(toAuth, c.env.JWT_SECRET)
    if(!decoded){
        c.status(403);
        return c.json({message: "Unauthorized"})
    };

    const user_id = decoded.id;
    c.set("userId",user_id)

    next()
}


export default authMiddleware;
