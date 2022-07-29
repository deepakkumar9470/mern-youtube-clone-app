import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Home = ({type}) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
     const fetchVideos = async () =>{
               try {
                // const url = 'https://mern-video-stream-app.herokuapp.com/api'
                const res = await axios.get(`/video/${type}`)
                console.log(res.data)
                setVideos(res.data)
               } catch (error) {
                   console.log(error)
               }
     }
     fetchVideos()
  }, [])
  
  return (
    <Container>
      {videos?.map((video) =>(
          <Card key={video._id} video={video}/>

      ))}
    
    </Container>
  )
}

export default Home