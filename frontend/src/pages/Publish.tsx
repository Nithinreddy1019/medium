import { useState } from "react";
import PublishAppbar from "../components/ui/PublishAppbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const PublishBlog = async () => {
        try {
            const response = axios.post(`${BACKEND_URL}/api/v1/blogpost/blog`,{
                title: title,
                content: content
            }, {
                headers: {
                    Authorization: "Bearer "+localStorage.getItem("token")
                }
            });
            const id = (await response).data.res.id;
            navigate(`/blog/${id}`);

        } catch (error) {
            
        }
    }

  return (
    <div className="">
        <PublishAppbar name={"maajin"} onClick={PublishBlog}/>
        <div className="mt-20">
            <div className="flex justify-center items-center w-screen gap-2 text-[#495464]">
                <label className=" font-mono text-3xl font-bold py-2">Title:</label>
                <textarea className="text-[#495464] w-[500px] text-3xl font-semibold py-2 px-1 rounded-2xl focus:outline-[#E8E8E8] border-2" onChange={(e) => {
                    setTitle(e.target.value)
                }}></textarea>
            </div>
            <div className="flex justify-center items-center pt-4 pr-8 w-screen gap-2 text-[#495464]">
                <label className=" font-mono text-3xl font-bold py-2">Content:</label>
                <textarea className="text-[#495464] w-[500px] h-80 text-lg font-semibold py-2 px-1 rounded-2xl focus:outline-[#E8E8E8] border-2" onChange={(e) => {
                    setContent(e.target.value)
                }}></textarea>
            </div>
            
        </div>
    </div>
  )
}

export default Publish
