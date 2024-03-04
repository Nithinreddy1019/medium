interface FullBlogProps {
    title: string,
    content: string
}

const FullBlog = ({title, content}: FullBlogProps) => {
  return (
    <div>
      {title}{content}
    </div>
  )
}

export default FullBlog
