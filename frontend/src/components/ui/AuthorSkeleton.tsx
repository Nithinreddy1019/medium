
const AuthorSkeleton = () => {
  return (
    <div className="mt-8">
        <div role="status" className="animate-pulse">
            <div className="h-2.5  bg-gray-300 rounded-full max-w-[100px]"></div>
            <div className="flex items-center mt-4">
                <svg className="w-8 h-8 text-gray-200 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <div className="w-20 h-2.5 bg-gray-200 rounded-full  me-3"></div>
                <div className="w-24 h-2 bg-gray-200 rounded-full "></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}

export default AuthorSkeleton
