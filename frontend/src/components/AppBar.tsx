import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"
import Avatar, { genConfig } from 'react-nice-avatar'


interface AppBarProps {
    name: string,
}

const AppBar = ({name}: AppBarProps) => {
    const config = genConfig(`${name}`); 
  return (
    <div className="w-full fixed block top-0 left-0 right-0 bg-white z-50">
        <div className="flex justify-between px-20 border-b">
            <Link to={"/blogs"}>
                <div className="flex items-center cursor-pointer">
                    <img className="" src={logo}/>
                    <span className="font-bold text-xl">Medium</span>
                </div>  
            </Link> 
        <div className="flex items-center">
            <Avatar className="w-10 h-10" {...config} />

        </div>
        </div>
    </div>
  )
}

export default AppBar
