import { createContactApi } from "@/api/fetch";
import {
  removeDraft,
  setAge,
  setFirstName,
  setPhoto,
  setLastName,
} from "@/store/slices/addContactSlice";
import { RootState } from "@/store/store";
import { ContactType } from "@/types";
import { toBase64 } from "@/utils/file";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Add() {
  // hooks
  const router = useRouter();

  // useRef
  const inputPhoto = useRef<HTMLInputElement | null>(null);

  // redux
  const { firstName, lastName, age, photo } = useSelector(
    (state: RootState) => state.addContact
  );
  const dispatch = useDispatch();

  // useState
  const [isLoadingPhoto, setIsLoadingPhoto] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);

  // state
  const buttonDisable = useMemo(
    () => !firstName || !lastName || !age || !photo,
    [age, firstName, lastName, photo]
  );

  // function
  const onChangePhoto = (file?: File) => {
    if (file) {
      setIsLoadingPhoto(true);
      toBase64(file)
        .then((res) => {
          dispatch(setPhoto({ photo: res as string }));
        })
        .finally(() => setIsLoadingPhoto(false));
    }
  };

  const onBack = useCallback(() => {
    router.push("/");
  }, [router]);

  const onSubmit = () => {
    const payload: ContactType = {
      firstName,
      lastName,
      age,
      photo,
    };

    setIsLoadingCreate(true);
    createContactApi(payload)
      .then(() => {
        toast.success("Success Add Contact!");
        dispatch(removeDraft());
        onBack();
      })
      .catch(() => toast.error("Something is wrong!"))
      .finally(() => setIsLoadingCreate(false));
  };

  // render
  const breadcrumb = useMemo(() => {
    return (
      <Breadcrumbs>
        <BreadcrumbItem isDisabled>Main</BreadcrumbItem>
        <BreadcrumbItem onClick={onBack}>Contact List</BreadcrumbItem>
        <BreadcrumbItem>Add</BreadcrumbItem>
      </Breadcrumbs>
    );
  }, [onBack]);

  return (
    <main className="flex min-h-screen flex-col lg:p-12 sm:p-8 gap-4">
      {breadcrumb}
      <Card className="mx-auto">
        <CardHeader className="flex flex-row justify-center items-center flex-wrap">
          <div role="add-contact" className="text-xl font-bold ">Add New Contact</div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-row space-x-4">
            <Input
              size="sm"
              type="text"
              label="First Name"
              value={firstName}
              onValueChange={(val) =>
                dispatch(setFirstName({ firstName: val }))
              }
              isDisabled={isLoadingCreate}
            />
            <Input
              size="sm"
              type="text"
              label="Last Name"
              value={lastName}
              onValueChange={(val) => dispatch(setLastName({ lastName: val }))}
              isDisabled={isLoadingCreate}
            />
          </div>

          <div className="flex flex-row space-x-4">
            <Input
              size="sm"
              type="number"
              label="Age"
              min={0}
              value={age ? age.toString() : ""}
              onValueChange={(val) => dispatch(setAge({ age: Number(val) }))}
              isDisabled={isLoadingCreate}
            />
            <input
              ref={inputPhoto}
              className="hidden"
              type="file"
              placeholder="Select photo"
              accept="image/*"
              onChange={(e) => onChangePhoto(e.target.files?.[0])}
            />
            <Button
              size="lg"
              color="primary"
              onClick={() => inputPhoto.current?.click()}
              isDisabled={isLoadingPhoto || isLoadingCreate}
            >
              Pick Photo
            </Button>
          </div>
          <div className="flex justify-center">
            {photo && <Image width={300} alt="Contact" src={photo} />}
          </div>
        </CardBody>
        <CardFooter className="flex flex-row justify-center gap-4">
          <Button
            color="warning"
            variant="light"
            isDisabled={isLoadingCreate}
            onClick={onBack}
          >
            Cancel
          </Button>
          <Button
            color="warning"
            isDisabled={buttonDisable || isLoadingCreate}
            onClick={onSubmit}
            isLoading={isLoadingCreate}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
