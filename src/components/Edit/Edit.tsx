import { getDetailContactApi, updateContactApi } from "@/api/fetch";
import { RootState } from "@/store/store";
import { ContactType } from "@/types";
import { toBase64 } from "@/utils/file";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Image,
  CardFooter,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Edit() {
  // hooks
  const router = useRouter();
  const pathname = usePathname();

  // useRef
  const inputPhoto = useRef<HTMLInputElement | null>(null);

  // redux
  const contactData = useSelector((state: RootState) => state.editReducer);

  // useState
  const [isLoadingGetDetail, setIsLoadingGetDetail] = useState<boolean>(false);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [photo, setPhoto] = useState<string>("");

  // state
  const id = pathname?.split("/")?.[2];
  const buttonDisable = useMemo(
    () => !firstName || !lastName || !age || !photo,
    [age, firstName, lastName, photo]
  );

  // function
  const fetchDetail = useCallback(() => {
    if (id) {
      setIsLoadingGetDetail(true);
      getDetailContactApi(id)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setAge(res.data.age);
          setPhoto(res.data.photo);
        })
        .catch(() => toast.error("Something is wrong!"))
        .finally(() => setIsLoadingGetDetail(false));
    }
  }, [id]);

  const onChangePhoto = (file?: File) => {
    if (file) {
      setIsLoadingPhoto(true);
      toBase64(file)
        .then((res) => {
          setPhoto(res as string);
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

    setIsLoadingUpdate(true);
    updateContactApi(payload, id)
      .then(() => {
        toast.success("Success Edit Contact!");
        onBack();
      })
      .catch(() => toast.error("Something is wrong!"))
      .finally(() => setIsLoadingUpdate(false));
  };

  // useEffect
  useEffect(() => {
    if (
      contactData.id &&
      contactData.firstName &&
      contactData.lastName &&
      contactData.age &&
      contactData.photo
    ) {
      setFirstName(contactData.firstName);
      setLastName(contactData.lastName);
      setAge(contactData.age);
      setPhoto(contactData.photo);
    } else {
      fetchDetail();
    }
  }, [
    contactData.age,
    contactData.firstName,
    contactData.id,
    contactData.lastName,
    contactData.photo,
    fetchDetail,
  ]);

  // render
  const breadcrumb = useMemo(() => {
    return (
      <Breadcrumbs>
        <BreadcrumbItem isDisabled>Main</BreadcrumbItem>
        <BreadcrumbItem onClick={onBack}>Contact List</BreadcrumbItem>
        <BreadcrumbItem>Edit</BreadcrumbItem>
      </Breadcrumbs>
    );
  }, [onBack]);

  return (
    <main className="flex min-h-screen flex-col lg:p-12 sm:p-8 gap-4">
      {breadcrumb}
      <Card className="mx-auto">
        <CardHeader className="flex flex-row justify-center items-center flex-wrap">
          <div role="edit-contact" className="text-xl font-bold ">
            Edit Contact
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-row space-x-4">
            <Input
              size="sm"
              type="text"
              label="First Name"
              value={firstName}
              onValueChange={(val) => setFirstName(val)}
              isDisabled={isLoadingUpdate || isLoadingGetDetail}
            />
            <Input
              size="sm"
              type="text"
              label="Last Name"
              value={lastName}
              onValueChange={(val) => setLastName(val)}
              isDisabled={isLoadingUpdate || isLoadingGetDetail}
            />
          </div>

          <div className="flex flex-row space-x-4">
            <Input
              size="sm"
              type="number"
              label="Age"
              min={0}
              value={age ? age.toString() : ""}
              onValueChange={(val) => setAge(Number(val))}
              isDisabled={isLoadingUpdate || isLoadingGetDetail}
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
              isDisabled={
                isLoadingPhoto || isLoadingUpdate || isLoadingGetDetail
              }
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
            isDisabled={isLoadingUpdate || isLoadingGetDetail}
            onClick={onBack}
          >
            Cancel
          </Button>
          <Button
            color="warning"
            isDisabled={buttonDisable || isLoadingUpdate || isLoadingGetDetail}
            onClick={onSubmit}
            isLoading={isLoadingUpdate}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
