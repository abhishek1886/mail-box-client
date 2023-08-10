import React from 'react';

import { Container, Card } from 'react-bootstrap';
import SignUp from '../layout/inputs/SignUp';

const AuthPage = () => {
  return (
    <Container className="mx-5 mx-auto" style={{ maxWidth: "450px", marginTop: "150px" }}>
      <Card className="bg-secondary shadow p-3 px-4">
        <SignUp />
      </Card>
    </Container>
  )
}

export default AuthPage