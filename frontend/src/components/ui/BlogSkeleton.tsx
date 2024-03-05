
const BlogSkeleton = () => {
  return (
    <div className="px-24">
        <div role="status" className="animate-pulse pt-8" >
            <div className="h-16 bg-gray-200 rounded-full w-full mb-4"></div>
            <div className="h-1 bg-gray-200 rounded-full max-w-[200px] mb-2.5"></div>

            <div className="pt-4">
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[800px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[500px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[900px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
  )
}

export default BlogSkeleton
