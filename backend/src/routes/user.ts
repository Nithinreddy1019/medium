import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import z from 'zod';
import {SignupSchema, SigninSchema} from '@kethireddynithinreddy/medium-common';

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    }
}>();



userRouter.post("/signup", async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();

    const parsedBody = SignupSchema.safeParse(body);
  
    if(!parsedBody.success){
        c.status(411);
        return c.json({msg: "Incorrect values/credentials"})
    }

    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
  
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
      return c.json({
        token: token
      })
      
    } catch (error) {
      return c.status(403);
    }
  
  });
  
  

  //Signin route
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();

    const parsedBody = await SigninSchema.safeParse(body);

    if(!parsedBody.success){
      c.status(411);
      return c.json({msg: "Invalid values/credentials"})
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
  
    if (!user) {
         c.status(403);
        return c.json({ error: "user not found" });
    }

    if(body.password !== user.password){
        c.status(411);
        return c.json({msg: "Incorrect credentials"})
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
    token: jwt
    });
  });


  export default userRouter