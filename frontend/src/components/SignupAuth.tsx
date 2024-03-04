import { SignupType } from "@kethireddynithinreddy/medium-common"
import Heading from "./ui/Heading"
import InputBox from "./ui/InputBox"
import { useState } from "react"

const SignupAuth = () => {

    const [postInputs, setPostInputs] = useState<SignupType>({
        email: '',
        name: '',
        password: ''
    })

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
        <div className="flex justify-center">
            <Heading heading={"Create an account"} subHeading={"Already have an account?"} toLink={"/signin"} toLinkValue={"Login."}/>
        </div>
        <div className="flex justify-center flex-col items-center pt-4">
            <InputBox type="email" label={"Email"} placeholder={"Johndoe@gmail.com"} onChange={(e) => {
                setPostInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }}/>
            <InputBox type="text" label={"Name"} placeholder={"John doe"} onChange={(e) => {
                setPostInputs(c => ({
                    ...c,
                    name: e.target.value
                }))
            }}/>
            <InputBox type="password" label={"Password"} placeholder={"Your password"} onChange={(e) => {
                setPostInputs((c) => ({
                    ...c,
                    password: e.target.value
                }))
            }}/>

            <button type="button" className="mt-4 ml-2 w-full text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2">Signup</button>    
        </div>
    </div>
  )
}

export default SignupAuth
