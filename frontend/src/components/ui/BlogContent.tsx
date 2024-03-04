
interface blogContentProps {
    title: string,
    content: string
}

const BlogContent = ({title, content}: blogContentProps) => {
  return (
    <div className="text-[#495464] border-b pb-2">
      <div className="font-bold text-xl pt-2 ">
        {title}
      </div>
      <div className="pt-2">
        {content.slice(0, 200) + " ..."}
      </div>
      <div className="text-xs bg-slate-200 w-fit flex items-center mt-2 px-1 rounded-xl">
        {Math.ceil(content.length/100) + " min read"}
      </div>
    </div>
  )
}

export default BlogContent
