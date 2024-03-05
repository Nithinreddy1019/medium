import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import authMiddleware from '../middlewares/authMiddleware';
import { BlogPostSchema, BlogUpdateSchema } from '@kethireddynithinreddy/medium-common';

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    }
}>();


//authentication middleware use
blogRouter.use("/blog/*", authMiddleware)


//create new blog route
blogRouter.post("/blog", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
  
    const body = await c.req.json();
    const parsedBody = await BlogPostSchema.safeParse(body);

    if(!parsedBody.success){
      c.status(411);
      c.json({msg:"Invalid inputs"})
    }
    
    if(!body.title || !body.content){
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
      

      const blogAdded = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: userId
        },
        select: {
          id: true
        }
      })
  
      c.status(200);
      return c.json({msg: "Successfully created a post", res: blogAdded})
    } catch (error) {
      c.status(411);
      return c.json({msg: "An error occured"})
    }
  
});
  

//get a blog by id route
blogRouter.get("/blog/:id", async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const id = c.req.param('id');
  
    try {
      const blog = await prisma.post.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
  
      if(!blog){
        c.status(411);
        return c.json({msg: "No blog found"})
      }
  
      c.status(200)
      return c.json({blog})
    } catch (error) {
      c.status(411)
      return c.json({msg: "An error occured"})
    }
});
  


//blog update route
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
    return result
}
blogRouter.put("/blog", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();

    const parsedBody = await BlogUpdateSchema.safeParse(body);
    if(!parsedBody.success){
      c.status(411);
      c.json({msg:"Invalid inputs"})
    }

    const passedValues = filterNullValues(body);

    
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
  
});


//get all blogs
blogRouter.get("/blog/all/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany({
          select: {
            id: true,
            title: true,
            content: true,
            author: {
              select: {
                name: true
              }
            }
          }
        })
        c.status(200);
        return c.json(blogs)
    } catch (error) {
        c.status(411);
        return c.json({msg: "An error occured"})
    }
})



export default blogRouter;
