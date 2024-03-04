interface FullBlogProps {
    title: string,
    content: string,
    date: string
}

const FullBlog = ({title, content, date}: FullBlogProps) => {
  return (
    <div className="px-24 pt-8 text-[#495464]">
        <div className="font-bold text-3xl">
            {title}
        </div>
        <div className="pt-2 text-sm">
            {`Posted on ${date}`}
        </div>
        <div className="pt-6 text-lg">
            {content}
        </div>
      
    </div>
  )
}

export default FullBlog
