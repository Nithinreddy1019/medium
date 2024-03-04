import AvatarGen from "./AvatarGen"

interface AuthorProps {
    name: string
}
const Author = ({name}: AuthorProps) => {
  return (
    <div className="flex pt-8 items-center gap-4 text-[#495464]">
        <div className="">
            <AvatarGen name={name}/>
        </div>
        <div className="italic font-medium text-lg">
            {name}
        </div>
    </div>
  )
}

export default Author
