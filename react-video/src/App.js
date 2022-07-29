import React,{useState} from 'react'
import './App.css';

import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { lightTheme,darkTheme } from './utils/Theme';
import Home from './pages/Home'
import Video from './pages/Video'
import SignIn from './pages/SignIn';
import  { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Search from './components/Search';
const Container = styled.div`
    display: flex;
`
const Main = styled.div`
 flex: 7;
 background-color: ${({theme})=> theme.bg};
`
const Wrapper = styled.div`
  padding: 22px 36px;
`

function App() {
const {currentUser}  = useSelector((state) => state.user)  
const [darkMode, setDarkMode] = useState(false)
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

      <Container>
        <div>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 2000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
/>
        </div>
          <BrowserRouter>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
            <Navbar/>
            <Wrapper>
                <Routes>

                  <Route path ="/">
                    <Route index element={<Home type="random"/>} />
                    <Route path="trends" element={<Home type="trend"/>} />
                    <Route path="subscription" element={<Home type="sub"/>} />
                    <Route path="search" element={<Search/>} />

                    <Route path="signin" element={currentUser ?  <Home/> : <SignIn/>} />

                    <Route path="video">
                      <Route path=":id" element={<Video/>}/>
                    </Route>
                    
                  </Route>
                </Routes>
              
            </Wrapper>
        </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}



export default App;
