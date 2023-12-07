import { AddButton } from "@Components/UI/Buttons";
import s from "./FormAddWord.module.scss";
import { Input } from "@Components/UI/Inputs";
import { useCreateFolderMutation } from "src/genetated/types";
import { FC, FormEvent } from "react";
import { Preloader } from "@Components/UI/Preloaders";
import { Text } from "@Components/UI/Labels";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "src/utils";
import { GET_FOLDER } from "@lib/operations";
import Dialog from "@Components/UI/Dialog/Dialog";

interface IFormAddWordProps {
  setIsAddingWord: (isAddingWord: boolean) => void;
  isAddingWord: boolean;
}

const FormAddWord: FC<IFormAddWordProps> = ({
  setIsAddingWord,
  isAddingWord,
}) => {
  const navigate = useNavigate();

  const [createFolder, { loading, error }] = useCreateFolderMutation({
    onCompleted: () => {
      setIsAddingWord(false);
      navigate(".", { replace: true });
    },
    onError: ({ graphQLErrors }) => {
      for (const err of graphQLErrors) {
        if (err?.message === "Unauthorized") {
          removeTokens();
          navigate("/signin");
          break;
        }
      }
    },
    refetchQueries: [
      {
        query: GET_FOLDER,
      },
    ],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createFolder({
      variables: {
        name: e.currentTarget.folderName.value,
      },
    });
  };

  return (
    <Dialog isOpen={isAddingWord} setIsOpen={setIsAddingWord}>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Add word"
          name="folderName"
          autoComplete="off"
          required
        />
        <AddButton disabled={loading}>+</AddButton>
      </form>
      <Text color="#d62424" fontSize="14px">
        {error?.graphQLErrors[0].message}
      </Text>
      {loading ? <Preloader /> : null}
    </Dialog>
  );
};

export default FormAddWord;
