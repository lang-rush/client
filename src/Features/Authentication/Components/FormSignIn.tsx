import { Form, FormBlock, FormContainer } from "@Components/Form";
import { DarkButton } from "@Components/UI/Buttons";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { Preloader } from "@Components/UI/Preloaders";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "src/genetated/types";
import { setAccessToken, setRefreshToken } from "src/utils";
import { validateEmail, validatePassword } from "src/utils/validation";

const FormSignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const [signIn, { loading }] = useSignInMutation({
    onCompleted: (data) => {
      setAccessToken(data.signIn.accessToken);
      setRefreshToken(data.signIn.refreshToken);
      navigate("/");
    },
    onError: (err) => {
      const message = err.message;

      if (typeof message === "string") {
        setErrorMessage([message]);
      } else if (Array.isArray(message)) {
        setErrorMessage(message);
      } else {
        setErrorMessage(["Something went wrong"]);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage([]);

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const emailError = validateEmail(email);
    if (emailError) {
      setErrorMessage([emailError]);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage([passwordError]);
      return;
    }

    await signIn({
      variables: {
        email: email,
        password: password,
      },
    });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormBlock>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            disabled={loading}
            required
          />
          {errorMessage.map((err: string, i) => (
            <Text key={i} color="#d62424" fontSize="14px">
              {err}
            </Text>
          ))}
        </FormBlock>
        <FormBlock>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            disabled={loading}
            required
          />
        </FormBlock>
        <DarkButton type="submit" disabled={loading}>
          Sign In
        </DarkButton>
        {loading && <Preloader width={20} />}
        <div>
          <Text color="#808080">Don't have an account? </Text>
          <Link to="/signup" className="link-primary">
            Sign up
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export default FormSignIn;
