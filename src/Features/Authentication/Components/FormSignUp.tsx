import { Form, FormBlock, FormContainer } from "@Components/Form";
import { DarkButton } from "@Components/UI/Buttons";
import Dropdown, {
  DropdownOption,
} from "@Components/UI/Dropdowns/Dropdown/Dropdown";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { Preloader } from "@Components/UI/Preloaders";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Lang, useSignUpMutation } from "src/genetated/types";

const nativeLanguages: DropdownOption[] = [
  {
    label: "English",
    value: "EN",
    imagePath: "src/assets/icons/united-kingdom.png",
  },
  {
    label: "Ukrainian",
    value: "UK",
    imagePath: "src/assets/icons/ukraine.png",
  },
  {
    label: "German",
    value: "DE",
    imagePath: "src/assets/icons/germany.png",
  },
  {
    label: "Polish",
    value: "PL",
    imagePath: "src/assets/icons/poland.png",
  },
];

const FormSignUp = () => {
  const [signUp, { loading, error }] = useSignUpMutation();

  const [nativeLanguage, setNativeLanguage] = useState<DropdownOption>(
    nativeLanguages[0]
  );

  const isLoading = false;
  const errors = {
    emailError: "",
    passwordError: "",
  };

  const handleNativeLanguageChange = (option: DropdownOption) => {
    setNativeLanguage(option);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signUp({
      variables: {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        nativeLang: Lang.En,
      },
    });
    console.log(res);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
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
        <FormBlock>
          <Text>Choose your native language</Text>
          <Dropdown
            options={nativeLanguages}
            onChange={handleNativeLanguageChange}
            value={nativeLanguage}
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
