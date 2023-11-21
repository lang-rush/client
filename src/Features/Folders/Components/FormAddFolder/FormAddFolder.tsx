import { AddButton } from "@Components/UI/Buttons";
import s from "./FormAddFolder.module.scss";
import { Input } from "@Components/UI/Inputs";
import { useCreateFolderMutation } from "src/genetated/types";
import { FC, FormEvent } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { Preloader } from "@Components/UI/Preloaders";
import { Text } from "@Components/UI/Labels";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "src/utils";
import { useAppSelector } from "src/store/store";
import { GET_FOLDERS } from "@lib/operations";

interface IFormAddFolderProps {
  setIsAddingFolder: (isAddingFolder: boolean) => void;
}

const FormAddFolder: FC<IFormAddFolderProps> = ({ setIsAddingFolder }) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const navigate = useNavigate();
  const containerRef = useClickAway<HTMLDialogElement>(() => {
    setIsAddingFolder(false);
  });

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
    <dialog
      className={isDark ? `${s.container} ${s.dark}` : s.container}
      ref={containerRef}
    >
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
    </dialog>
  );
};

export default FormAddFolder;
