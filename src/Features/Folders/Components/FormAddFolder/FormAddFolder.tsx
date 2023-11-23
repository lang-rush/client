import { AddButton } from "@Components/UI/Buttons";
import s from "./FormAddFolder.module.scss";
import { Input } from "@Components/UI/Inputs";
import { useCreateFolderMutation } from "src/genetated/types";
import { FC, FormEvent } from "react";
import { Preloader } from "@Components/UI/Preloaders";
import { Text } from "@Components/UI/Labels";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "src/utils";
import { GET_FOLDERS } from "@lib/operations";
import Dialog from "@Components/UI/Dialog/Dialog";

interface IFormAddFolderProps {
  setIsAddingFolder: (isAddingFolder: boolean) => void;
  isAddingFolder: boolean;
}

const FormAddFolder: FC<IFormAddFolderProps> = ({
  setIsAddingFolder,
  isAddingFolder,
}) => {
  const navigate = useNavigate();

  const [createFolder, { loading, error }] = useCreateFolderMutation({
    onCompleted: () => {
      setIsAddingFolder(false);
      navigate(".", { replace: true });
    },
    onError: (error) => {
      if (error?.name === "UNAUTHENTICATED") {
        removeTokens();
        navigate("/signin");
      }
    },
    refetchQueries: [
      {
        query: GET_FOLDERS,
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
    <Dialog isOpen={isAddingFolder} setIsOpen={setIsAddingFolder}>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Folder name"
          name="folderName"
          autoComplete="off"
          required
        />
        <AddButton>+</AddButton>
      </form>
      <Text color="#d62424" fontSize="14px">
        {error?.graphQLErrors[0].message}
      </Text>
      {loading ? <Preloader /> : null}
    </Dialog>
  );
};

export default FormAddFolder;
