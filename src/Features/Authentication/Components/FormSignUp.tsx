import { Form, FormBlock, FormContainer } from "@Components/Form";
import { DarkButton } from "@Components/UI/Buttons";
import Dropdown, {
  DropdownOption,
} from "@Components/UI/Dropdowns/Dropdown/Dropdown";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { Preloader } from "@Components/UI/Preloaders";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lang, useSignUpMutation } from "src/genetated/types";

import { setAccessToken, setRefreshToken } from "src/utils";
import { validateEmail, validatePassword } from "src/utils/validation";

const nativeLanguages: DropdownOption<Lang>[] = [
  {
    label: "Ukrainian",
    value: Lang.Uk,
    imagePath: "src/assets/icons/ukraine.png",
  },
  {
    label: "German",
    value: Lang.De,
    imagePath: "src/assets/icons/germany.png",
  },
  {
    label: "Polish",
    value: Lang.Pl,
    imagePath: "src/assets/icons/poland.png",
  },
];

const FormSignUp = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [nativeLanguage, setNativeLanguage] = useState<DropdownOption<Lang>>(
    nativeLanguages[0]
  );

  const [signUp, { loading }] = useSignUpMutation({
    onCompleted: (data) => {
      setAccessToken(data.signUp.accessToken);
      setRefreshToken(data.signUp.refreshToken);
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
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

  const handleNativeLanguageChange = (option: DropdownOption<Lang>) => {
    setNativeLanguage(option);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    await signUp({
      variables: {
        email: email,
        password: email,
        nativeLang: nativeLanguage.value,
      },
    });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormBlock>
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
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
        <FormBlock>
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            disabled={loading}
          />
        </FormBlock>
        <FormBlock>
          <Text>Choose your native language</Text>
          <Dropdown<Lang>
            options={nativeLanguages}
            onChange={handleNativeLanguageChange}
            value={nativeLanguage}
          />
        </FormBlock>
        <DarkButton disabled={loading}>Sign Up</DarkButton>
        {loading && <Preloader width={20} />}
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
