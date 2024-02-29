import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import authMiddleware from '../middlewares/authMiddleware';

type Variables = {
  userId: string
}

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    Variables: Variables
  }
}>

//authorization middleware
app.use("/api/v1/blog/*", authMiddleware)

app.get('/', async (c) => {
  return c.text('Hello Hono!')
})


//Signup route
app.post("/api/v1/signup", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
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
app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({
    token: jwt
  });
});



app.post("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  const {title, content} = await c.req.json();
  if(!title || !content){
    c.status(411);
    return c.json({msg:"Invalid inputs"})
  }

  const userId = c.get('userId');
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        posts: {
          create: {
            title: title,
            content: content
          }
        }
      }
    });

    c.status(200);
    return c.json({msg: "Successfully created a post"})
  } catch (error) {
    c.status(411);
    return c.json({msg: "An error occured"})
  }


  return c.text("add a blog route")
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param('id');
  console.log(id);
  return c.text("get blogs route")
})

app.put("/api/v1/blog", (c) => {
  return c.text("Update blog route")
})


export default app
