import Avatar, { genConfig } from 'react-nice-avatar'

interface AvatarCompProps {
    name: string,
    date: string
}

const AvatarComp = ({name, date}: AvatarCompProps) => {
    const config = genConfig(`${name}`); 
  return (
    <div className='flex items-center gap-2'>
      <Avatar className="w-8 h-8" {...config} />
      <div className='text-[#495464]'>
        {name}
      </div>
      <div className='h-1 w-1 rounded-full bg-[#495464]'>
      </div>
      <div className='text-[#495464] text-xs'>
        {date}
      </div>  
    </div>
  )
}

export default AvatarComp
