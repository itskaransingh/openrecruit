import axios from 'axios'
import { useEffect, useState } from 'react'



const useFetch = (endPoint: string, queries: any) => {
    const [data, setData] = useState<any[]>([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endPoint}`,
        params: {
            ...queries
        },
        headers: {
            'X-RapidAPI-Key': '41a15882dcmsh095f645cbac179bp192e15jsnf128aca88af7',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.request(options);
            // console.log({data:response.data})
            setData(response.data.data)
        } catch (error: any) {
            console.log(error)
            setError(error)
            alert('There is an error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        fetchData()
    }

    return {
        data,
        error,
        loading,
        refetch
    }



}

export default useFetch