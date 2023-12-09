import { EditButton } from "@Components/UI/Buttons";
import s from "./FormEditFolderName.module.scss";
import { Input } from "@Components/UI/Inputs";
import { useUpdateFolderMutation } from "src/genetated/types";
import { FC, FormEvent } from "react";
import { Preloader } from "@Components/UI/Preloaders";
import { Text } from "@Components/UI/Labels";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "src/utils";
import { GET_FOLDER } from "@lib/operations";
import Dialog from "@Components/UI/Dialogs/Dialog/Dialog";

interface IFormEditFolderProps {
  setIsEditingFolder: (isEditingFolder: boolean) => void;
  isEditingFolder: boolean;
  folderId: string;
  initialName?: string;
}

const FormEditFolderName: FC<IFormEditFolderProps> = ({
  setIsEditingFolder,
  isEditingFolder,
  initialName,
  folderId,
}) => {
  const navigate = useNavigate();

  const [updateFolder, { loading, error }] = useUpdateFolderMutation({
    onCompleted: () => {
      setIsEditingFolder(false);
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
    await updateFolder({
      variables: {
        id: folderId,
        name: e.currentTarget.folderName.value,
      },
    });
  };

  return (
    <Dialog setIsOpen={setIsEditingFolder}>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Folder name"
          name="folderName"
          autoComplete="off"
          defaultValue={initialName}
          required
        />
        <EditButton disabled={loading} />
      </form>
      <Text color="#d62424" fontSize="14px">
        {error?.graphQLErrors[0].message}
      </Text>
      {loading ? <Preloader /> : null}
    </Dialog>
  );
};

export default FormEditFolderName;
