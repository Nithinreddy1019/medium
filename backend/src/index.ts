import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';

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



app.post("/api/v1/blog", (c) => {
  

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
