import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from 'axios'
import { useSelector } from "react-redux";


const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {

  const {currentUser}  = useSelector((state) => state.user)
  const [comments, setComments] = useState([])

  useEffect(() => {
       const fetchComment = async () =>{
         try {
          // const url = 'https://mern-video-stream-app.herokuapp.com/api'
           const res = await axios.get(`${url}/comments/${videoId}`)
           setComments(res.data) 
         } catch (error) {
           console.log(error)
         }
       }
       fetchComment()
  }, [videoId])
  
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {
        comments.map((c) => (
            <Comment key={c._id} comment={c}/>

        ))
      }
    
    </Container>
  );
};

export default Comments;