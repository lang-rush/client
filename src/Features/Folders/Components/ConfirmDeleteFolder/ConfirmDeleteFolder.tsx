import { DarkButton } from "@Components/UI/Buttons";
import Dialog from "@Components/UI/Dialog/Dialog";
import { Text } from "@Components/UI/Labels";
import { Preloader } from "@Components/UI/Preloaders";
import { FC, FormEvent } from "react";
import s from "./ConfirmDeleteFolder.module.scss";
import { useNavigate } from "react-router-dom";
import { useDeleteFolderMutation } from "src/genetated/types";
import { removeTokens } from "src/utils";
import { GET_FOLDERS } from "@lib/operations";

interface IConfirmDeleteFolderProps {
  folderId: string;
  setIsDeletingFolder: (isAddingFolder: boolean) => void;
  isDeletingFolder: boolean;
}

const ConfirmDeleteFolder: FC<IConfirmDeleteFolderProps> = ({
  folderId,
  setIsDeletingFolder,
  isDeletingFolder,
}) => {
  const navigate = useNavigate();

  const [createFolder, { loading, error }] = useDeleteFolderMutation({
    onCompleted: () => {
      setIsDeletingFolder(false);
      navigate(".", { replace: true });
    },
    onError: ({ graphQLErrors }) => {
      for (const err of graphQLErrors) {
        if (err?.extensions.code === "UNAUTHENTICATED") {
          removeTokens();
          navigate("/signin");
          break;
        }
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
        id: folderId,
      },
    });
  };

  return (
    <Dialog isOpen={isDeletingFolder} setIsOpen={setIsDeletingFolder}>
      <form className={s.form} onSubmit={handleSubmit}>
        <Text color="#d62424" fontSize="18px">
          Are you sure you want to delete this folder?
        </Text>
        <DarkButton>Cancel</DarkButton>
        <DarkButton>Delete</DarkButton>
      </form>
      <Text color="#d62424" fontSize="14px">
        {error?.graphQLErrors[0].message}
      </Text>
      {loading ? <Preloader /> : null}
    </Dialog>
  );
};

export default ConfirmDeleteFolder;
