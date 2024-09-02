// import { useState } from 'react'
import styled from 'styled-components'
import './App.css'
import ProfileForm from './components/ProfileForm'
import UniversityList from './components/UniversityList'

function App() {
  return (
    <>
      <Container>
        <Heading>GPA Calculator</Heading>
        <ProfileForm />
      </Container>
      <UniversityList />
    </>
  )
}

export default App


const Container = styled.div `
  border: 1px solid #c7c7cf;
  max-width: 1280px;
  margin: 30px;
  padding: 30px;
  border-radius: 10px;
`

const Heading = styled.h1 `
  color: #202042;
  font-size: 2rem;
  margin-bottom: 2rem;
`