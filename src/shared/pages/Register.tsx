import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {MembershipTypeEnum} from '@interviewApp/src/config';
import actions from '@interviewApp/src/shared/redux/action';
import Error from '@interviewApp/src/shared/components/atom/error';
import {withGoToNav} from '@interviewApp/src/shared/hocs/withGoToNav';
import {
  RegisterUserDataServiceResponse,
  useAppDispatch,
} from '@interviewApp/src/types';
import Style from '@interviewApp/src/shared/components/atom/style';

export interface RegisterForm {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  membershipType: string;
}

interface RegisterComponent {
  navigateToRoute: (path: string) => void;
}

const Register = ({navigateToRoute}: RegisterComponent) => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    fullName: 'james tony',
    userName: 'jamesE',
    email: 'cc@live.com',
    password: 'Test1234',
    confirmPassword: 'Test1234',
    membershipType: 'gold',
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
    setRegisterForm(
      (state: RegisterForm): RegisterForm => ({
        ...state,
        [propName]: event.target.value,
      }),
    );

  const dispatch = useAppDispatch();

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    setDisable(true);

    const {confirmPassword, ...newRegisterForm} = registerForm;

    const response: RegisterUserDataServiceResponse = await dispatch(
      actions.registerUser(newRegisterForm),
    );

    if (response.isRegistered) {
      navigateToRoute('/Login');
    } else {
      setError({
        isError: true,
        message: 'Unable to register user at this time due to server error',
      });
    }
    setDisable(false);
  };

  return (
    <>
      <Container>
        <h2>Register</h2>
        <Form onSubmit={(e: any) => onSubmit(e)}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Your Full Name</Form.Label>
            <Form.Control
              type="text"
              value={registerForm.fullName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'fullName')
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="userName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={registerForm.userName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'userName')
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={registerForm.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'email')
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={registerForm.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'password')
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirmation Password</Form.Label>
            <Form.Control
              type="password"
              value={registerForm.confirmPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'confirmPassword')
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="membershipType">
            <Form.Check
              value="gold"
              type="radio"
              name="membershipTypes"
              label="Gold"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'membershipType')
              }
              checked={registerForm.membershipType === MembershipTypeEnum.Gold}
            />
            <Form.Check
              value="silver"
              type="radio"
              name="membershipTypes"
              label="Silver"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'membershipType')
              }
              checked={
                registerForm.membershipType === MembershipTypeEnum.Silver
              }
            />
            <Form.Check
              value="bronze"
              type="radio"
              name="membershipTypes"
              label="Bronze"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(event, 'membershipType')
              }
              checked={
                registerForm.membershipType === MembershipTypeEnum.Bronze
              }
            />
          </Form.Group>
          <Button disabled={disable} type="submit">
            Register
          </Button>
          <Error errorArg={error} />
        </Form>
      </Container>
      <Style>{`
        .form-control {
          width: 50%;
        }
      `}</Style>
    </>
  );
};

export default withGoToNav(Register);
