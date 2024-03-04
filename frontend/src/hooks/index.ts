import { useState, useEffect } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";


interface Blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blogpost/blog/all/bulk`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            setBlogs(res.data);
            setLoading(false)
        })
    }, [])


    return {loading, blogs}
}

export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blogpost/blog/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            setBlog(res.data.blog);
            setLoading(false)
        })
    }, [])


    return {loading, blog}
}