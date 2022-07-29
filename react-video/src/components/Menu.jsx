import React from 'react'
import styled from 'styled-components'
import logo from '../images/youtube.png'

import { ExploreOutlined, FlagOutlined, HelpOutlineOutlined, 
  HistoryOutlined, Home as HomeIcon,LibraryMusicOutlined,
  LiveTvOutlined,MovieOutlined,SettingsOutlined,SportsBasketballOutlined,
  SportsEsportsOutlined,SubscriptionsOutlined, VideoLibraryOutlined,ArticleOutlined, 
  SettingsBrightnessOutlined, AccountCircleOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Container = styled.div`
  flex: 1;
  background-color: ${({theme})=>theme.bgLighter};
  color: ${({theme})=>theme.text};
  height: 100vh;
  font-size: 14px;
  position: sticky;
  top: 0;
`
const Wrapper = styled.div`
  padding: 18px 26px;
`

const Logo = styled.div`
 display: flex;
 align-items: center;
 gap:5px;
 font-weight: bold;
 margin-bottom: 25px;
`
const Img = styled.img`
    height: 25px;
`
const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 5.5px 0px;
    cursor: pointer;
`
const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;
const Hr = styled.hr`
  
`

const Menu = ({darkMode,setDarkMode}) => {
  
  const {currentUser}  = useSelector((state) => state.user)
  return (
    <Container>
      <Wrapper>
        <Link to="/" className='link'>
        <Logo>
          <Img src={logo} alt="logo"/>
          DTube
         </Logo>
        </Link>
         <Item>
          <HomeIcon/>
          Home
          
         </Item>
        <Link to="trends" className='link'>
        <Item>
          <ExploreOutlined />
           Explore
          </Item>
        </Link>
         <Link to="subscription" className='link'>
         <Item>
            <SubscriptionsOutlined/>
             Subscription
          </Item>
         </Link>
          <Item>
          <VideoLibraryOutlined />
          Library
        </Item>
        <Item>
          <HistoryOutlined />
          History
        </Item>
        <Hr/>
        {
          !currentUser && 
          <>
            <Login>
        Sign in to like videos, comment, and subscribe.
        <Link to="signin" style={{textDecoration:"none"}}>
            <Button>
              <AccountCircleOutlined />
              SIGN IN
            </Button>
          </Link>
        </Login>
        <Hr />
          </>
        }
        <Title>BEST OF DTUBE</Title>
        <Item>
          <LibraryMusicOutlined />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlined />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlined />
          Gaming
        </Item>
        <Item>
          <MovieOutlined />
          Movies
        </Item>
        <Item>
          <ArticleOutlined />
          News
        </Item>
        <Item>
          <LiveTvOutlined />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlined />
          Settings
        </Item>
        <Item>
          <FlagOutlined />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlined />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlined />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Menu