import { useState } from "react"
import Heading from "./ui/Heading"
import InputBox from "./ui/InputBox"
import { SigninType } from "@kethireddynithinreddy/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

const SigninAuth = () => {
    const navigate = useNavigate()
    const [signinInputs, setSigninInputs] = useState<SigninType>({
        email: '',
        password: ''
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {...signinInputs});
            const token = response.data.token;
            localStorage.setItem("token", token)
            navigate("/blogs")
        } catch(error) {
            alert("Error while Logging in")
        }
    }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex justify-center">
            <Heading heading={"Login to your account"} subHeading={"Don't have an account?"} toLink={"/signup"} toLinkValue={"Signup."}/>
        </div>
        <div className="flex justify-center flex-col items-center pt-4">
            <InputBox type="email" label={"Email"} placeholder={"Johndoe@gmail.com"} onChange={(e) => {
                setSigninInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }}/>
            <InputBox type="password" label={"Password"} placeholder={"Your password"} onChange={(e) => {
                setSigninInputs((c) => ({
                    ...c,
                    password: e.target.value
                }))
            }}/>

            <button type="button" className="mt-4 ml-2 w-full text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2" onClick={sendRequest}>Login</button>

        </div>
    </div>
  )
}

export default SigninAuth
