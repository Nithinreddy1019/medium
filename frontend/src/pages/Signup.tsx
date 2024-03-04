import Quote from "../components/Quote"
import SignupAuth from "../components/SignupAuth"

const Signup = () => {
    return (
      <div className="grid lg:grid-cols-2">
        <div className="">
            <SignupAuth />
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
        
      </div>
    )
  }
  
export default Signup
  