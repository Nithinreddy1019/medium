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

  //@ts-ignore
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

});

app.get("/api/v1/blog/:id", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id
      }
    });

    if(!blog){
      c.status(411);
      return c.json({msg: "No blog found"})
    }

    c.status(200)
    return c.json({
      title: blog?.title,
      content: blog?.content
    })
  } catch (error) {
    c.status(411)
    return c.json({msg: "An error occured"})
  }
})

interface reqBody {
  title? :string,
  content? :string,
  published? :boolean
}
function filterNullValues(body: Partial<reqBody>): Partial<reqBody>{
  const result: Partial<reqBody> = {}

  for (let key in body){
    if(body[key as keyof reqBody] !== null && body[key as keyof reqBody] !== undefined){
      //@ts-ignore
      result[key as keyof reqBody] = body[key as keyof reqBody]
    }
  }
  return result;
}
app.put("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const passedValues = filterNullValues(body);

  //@ts-ignore
  const userId = c.get("userId");
  const postId = c.req.query('id');

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId
      },
      data: {...passedValues}
    })

    c.status(200);
    return c.json({
      msg: "successfully updated the blog"
    })
  } catch (error) {
    c.status(411);
    return c.json({msg: "An error occured"})
  }

})


export default app
