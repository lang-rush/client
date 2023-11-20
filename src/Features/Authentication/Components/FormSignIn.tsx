import { Form, FormBlock, FormContainer } from "@Components/Form";
import { DarkButton } from "@Components/UI/Buttons";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { Preloader } from "@Components/UI/Preloaders";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "src/genetated/types";
import { CustomApolloError } from "src/interfaces";
import { setAccessToken, setRefreshToken } from "src/utils";

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
      const message = (err as CustomApolloError).graphQLErrors[0].extensions
        .originalError.message;
      console.log(err.graphQLErrors);

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

    await signIn({
      variables: {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
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
