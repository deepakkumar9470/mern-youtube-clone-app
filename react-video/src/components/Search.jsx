import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Card from './Card'

const Container = styled.div`  
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`


const Search = () => {
    const [videos, setVideos] = useState([])
    const query = useLocation().search;

  useEffect(() => {
     const fetchVideos = async () =>{
               try {
                // const url = 'https://mern-video-stream-app.herokuapp.com/api'
                const res = await axios.get(`$/video/search${query}`)
                setVideos(res.data)
               } catch (error) {
                   console.log(error)
               }
     }
     fetchVideos()
  }, [query])
  return (
    <Container>
        {
            videos.map((video)=>(
                <Card key={video._id} video={video}/>
            ))
        }
    </Container>
  )
}

export default Search