import { Form, FormBlock, FormContainer } from "@Components/Form";
import { DarkButton } from "@Components/UI/Buttons";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { Preloader } from "@Components/UI/Preloaders";
import { Link } from "react-router-dom";

const FormSignUp = () => {
  const isLoading = false;
  const errors = {
    emailError: "",
    passwordError: "",
  };
  return (
    <FormContainer>
      <Form method="post">
        <FormBlock>
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.emailError}
          </Text>
        </FormBlock>
        <FormBlock>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.passwordError}
          </Text>
        </FormBlock>
        <FormBlock>
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            disabled={isLoading}
          />
        </FormBlock>
        <DarkButton disabled={isLoading}>Sign Up</DarkButton>
        {isLoading && <Preloader width={20} />}
        <div>
          <Text color="#808080">Already have an account? </Text>
          <Link to="/signin" className="link-primary">
            Sign in
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export default FormSignUp;
