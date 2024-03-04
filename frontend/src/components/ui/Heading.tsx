import { Link } from "react-router-dom"


interface headingProps {
    heading: string,
    subHeading: string,
    toLink: string,
    toLinkValue: string
}

const Heading = ({heading, subHeading, toLink, toLinkValue}: headingProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold text-[#495464]">
        {heading}
      </div>
      <div className="text-[#BBBFCA] text-sm pt-2">
        {subHeading}
        <Link className="pl-2 underline" to={toLink}>{toLinkValue}</Link>
      </div>
    </div>
  )
}

export default Heading
