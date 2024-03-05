import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Home = () => {

    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/`, {
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        }).then((res) => {
            if(res.data.message !== "Unauthorized"){
                navigate("/signup")
            } else {
                navigate("/blogs")    
            }
            
        })
    }, [])

    

  return (
    <div>
      ffff
    </div>
  )
}

export default Home
