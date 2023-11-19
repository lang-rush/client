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
import { CustomApolloError } from "src/interfaces";
import { setAccessToken, setRefreshToken } from "src/utils";

const nativeLanguages: DropdownOption<Lang>[] = [
  {
    label: "English",
    value: Lang.En,
    imagePath: "src/assets/icons/united-kingdom.png",
  },
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

  const [signUp, { loading, error }] = useSignUpMutation({
    onCompleted: (data) => {
      setAccessToken(data.signUp.accessToken);
      setRefreshToken(data.signUp.refreshToken);
      navigate("/");
    },
  });

  const [nativeLanguage, setNativeLanguage] = useState<DropdownOption>(
    nativeLanguages[0]
  );

  const errors = {
    emailError: "",
    passwordError: "",
  };

  const handleNativeLanguageChange = (option: DropdownOption) => {
    setNativeLanguage(option);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      e.currentTarget.password.value !== e.currentTarget.confirmPassword.value
    ) {
      alert("Passwords should match");
      return;
    }

    await signUp({
      variables: {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        nativeLang: Lang.En,
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

          {(
            error as CustomApolloError
          )?.graphQLErrors[0]?.extensions.originalError.message.map(
            (err: string, i) => (
              <Text key={i} color="#d62424" fontSize="14px">
                {err}
              </Text>
            )
          )}
        </FormBlock>
        <FormBlock>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            disabled={loading}
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
            disabled={loading}
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
