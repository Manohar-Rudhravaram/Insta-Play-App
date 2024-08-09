import { useEffect, useState } from "react"
import axios from 'axios';
export default function useFetch(url){
    let [data,setData]=useState([]);
    let [loading,setLoading]=useState(false);
    let [error,setError]=useState('');
    useEffect(()=>{
        async function getData(){
            try {
                setLoading(true)
               let {data} =await axios(url);
               setData(data)
               setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        getData()
    },[url])
    return {loading,error,data}
}