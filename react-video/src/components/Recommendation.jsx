import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import axios from 'axios'
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;
const Recommendation = ({tags}) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // const url = 'https://mern-video-stream-app.herokuapp.com/api'
          const res = await axios.get(`/video/tags?tags=${tags}`);
          setVideos(res.data)
        } catch (err) {
            console.log(err)
        }
      };
      fetchData();
    }, []);
  
  return (
    <Container>
       {
        videos.map((video) =>(
            <Card type="sm" key={video._id} video={video}/>
        ))
       }
    </Container>
  )
}

export default Recommendation