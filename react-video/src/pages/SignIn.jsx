import React,{useState} from "react";
import styled from "styled-components";
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {loginStart,loginSuccess,loginError} from '../redux/userSlice'
import {auth,provider} from '../firebase'
import {signInWithPopup} from 'firebase/auth'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


 

  const handleLogin = async (e) =>{
    dispatch(loginStart())
          e.preventDefault()
          try {
              //  const url = 'https://mern-video-stream-app.herokuapp.com/api'
               const res = await axios.post(`/auth/login`, {name,email,password})
               console.log(res.data)
               dispatch(loginSuccess(res.data))
               navigate('/')
          } catch (error) {
           
            dispatch(loginError())
          }
  }

  const signInWithGoogle =  async () =>{
      dispatch(loginStart())

        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result)
             axios.post('/auth/google',{
              name : result.user.displayName,
              email : result.user.email,
              img : result.user.photoURL,
            }).then((res)=>{
              dispatch(loginSuccess(res.data))
            })
          })
         .catch((error) =>{
          dispatch(loginError())
         })
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to DTube</SubTitle>
        <Input placeholder="username"
          onChange={(e)=> setName(e.target.value)} value={name}  name="name"/>
        <Input type="password" placeholder="password"
            onChange={(e)=> setPassword(e.target.value)} value={password} name="password" />
        <Button onClick={handleLogin}>Sign in</Button>

        <Title>or</Title>
         <Button onClick={signInWithGoogle}>SignIn with Google</Button>
        <Title>or</Title>

        <Input placeholder="username"
          onChange={(e)=> setName(e.target.value)} value={name} />
        <Input placeholder="email"
          onChange={(e)=> setEmail(e.target.value)} name="email" value={email} />
        <Input type="password" placeholder="password"
          onChange={(e)=> setPassword(e.target.value)} value={password} />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;