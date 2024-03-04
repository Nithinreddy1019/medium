import Quote from "../components/Quote"
import SigninAuth from "../components/SigninAuth"

const Signin = () => {
  return (
    <div className="grid lg:grid-cols-2">
        <div>
            <SigninAuth />
        </div>
        <div>
            <Quote />
        </div>
    </div>
  )
}

export default Signin
