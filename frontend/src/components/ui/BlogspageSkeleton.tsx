
const BlogspageSkeleton = () => {
  return (
    <div className="px-24 pt-6">
        <div role="status" className=" animate-pulse">
            <div className="flex items-center">
                <div className="flex items-center justify-center pb-4">
                    <svg className="w-8 h-8 text-gray-200 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4 max-w-[100px]"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded-full max-w-[560px] mb-6"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-2 mb-2.5 text-xs bg-slate-200 max-w-[50px] flex items-center mt-2 px-1 rounded-xl"></div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}

export default BlogspageSkeleton
