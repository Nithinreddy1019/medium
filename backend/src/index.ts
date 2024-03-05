import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import authMiddleware from './middlewares/authMiddleware';
import userRouter from './routes/user';
import blogRouter from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string
  }
}>

app.use(cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blogpost", blogRouter);

//authorization middleware

app.get('/', async (c) => {
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

    c.status(200);
    return c.json({message: "Success"})
})




export default app
