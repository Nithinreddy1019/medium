import AvatarGen from "./AvatarGen"

interface AuthorProps {
    name: string
}
const Author = ({name}: AuthorProps) => {
  return (
    <div className="pt-8 text-[#495464]">
        <div className=" ">
            Author
        </div>
        <div className="flex items-center gap-4 pt-2">
            <div className="">
                <AvatarGen name={name}/>
            </div>
            <div className="italic font-medium text-lg">
                {name}
            </div>
        </div>
    </div>
  )
}

export default Author
