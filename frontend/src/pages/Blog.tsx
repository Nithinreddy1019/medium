import AppBar from "../components/AppBar";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

const Blog = () => {
    const { id } = useParams()
    const {loading, blog} = useBlog({
        id: id || ""
    });
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
            <div className="col-span-2 ">
                <FullBlog title={blog?.title || ""} content={blog?.content || ""}/>
            </div>
            <div className="hidden lg:block pt-2">
                
            </div>
        </div>
    </div>
    
  )
}

export default Blog
