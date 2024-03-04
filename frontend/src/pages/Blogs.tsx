import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"

const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return(
            <div>
                <div>
                    <AppBar name={"Maajin"}/>
                </div>
                <div className="mt-16">
                    Loading...
                </div>
            </div>
        )
    }

  return (
    <div>
        <div>
            <AppBar name={"Maajin"}/>
        </div>
        <div className="grid lg:grid-cols-3 pt-2 mt-16">
            <div className="col-span-2 cursor-pointer">
                {blogs.map((blog) => {
                    return <BlogCard id={blog.id} name={blog.author.name} date={"Mar 4, 2024"}  title={blog.title} content={blog.content}/>
                })}
            </div>
            <div className="hidden lg:block pt-2">
                Tags
            </div>
        </div>
    </div>
  )
}

export default Blogs
