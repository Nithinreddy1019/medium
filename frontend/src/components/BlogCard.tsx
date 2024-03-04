import { Link } from "react-router-dom"
import AvatarComp from "./ui/AvatarComp"
import BlogContent from "./ui/BlogContent"

interface BlogCardProps {
    id: string,
    name: string, 
    date: string,
    title: string,
    content: string
}

const BlogCard = ({id, name, date, title, content}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className="px-24 pt-4 ">
            <AvatarComp name={name} date={date}/>
            <BlogContent title={title} content={content}/>
        </div>
    </Link>
  )
}

export default BlogCard
