import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import authMiddleware from '../middlewares/authMiddleware';

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



export default blogRouter;
