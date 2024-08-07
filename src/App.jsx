import { useState } from 'react'
import Form from './components/Form';
import ApiData from './components/ApiData';
import { Container } from 'react-bootstrap';

function App() {

  return (
    <>
      <Container>
        <Form></Form>
        <ApiData></ApiData>
      </Container>
    </>
  )
}

export default App
