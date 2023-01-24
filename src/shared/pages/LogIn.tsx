import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {
  LoginResponse,
  useAppDispatch,
  LoginForm,
} from '@interviewApp/src/types';
import actions from '@interviewApp/src/shared/redux/action';
import Error from '@interviewApp/src/shared/components/atom/error';
import {withGoToNav} from '@interviewApp/src/shared/hocs/withGoToNav';

interface LoginComponent {
  navigateToRoute: (path: string) => void;
}

const Login = ({navigateToRoute}: LoginComponent) => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    userName: '',
    password: '',
  });
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState<Error>({
    isError: false,
    message: '',
  });

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    propName: string,
  ) =>
    setLoginForm(
      (state: LoginForm): LoginForm => ({
        ...state,
        [propName]: event.target.value,
      }),
    );

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    setDisable(true);
    const response: LoginResponse = await dispatch(actions.login(loginForm));

    if (response.hasLoggedIn) {
      navigateToRoute('/Home');
    } else {
      setError({
        isError: true,
        message: response.errorMessage,
      });
    }
    setDisable(false);
  };

  return (
    <>
      <Container>
        <h2>Login</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={loginForm.userName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'userName')
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={loginForm.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'password')
              }
            />
          </Form.Group>
          <Button disabled={disable} type="submit">
            Log In
          </Button>
          <Error errorArg={error} />
        </Form>
      </Container>
      <style jsx>{`
        .form-control {
          width: 50%;
        }
      `}</style>
    </>
  );
};

export default withGoToNav(Login);
