import Avatar, { genConfig } from 'react-nice-avatar'


interface AvatarGenProps {
    name: string
}

const AvatarGen = ({name}: AvatarGenProps) => {
    const config = genConfig(`${name}`); 

  return (
    <div>
        <Avatar className="w-10 h-10" {...config} />
    </div>
  )
}

export default AvatarGen
