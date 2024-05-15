import {
  deleteContactApi,
  getDetailContactApi,
  getListContactApi,
} from "@/api/fetch";
import { ContactType } from "@/types";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ContactCard from "../Commons/ContactCard/ContactCard";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { getPage, getPagination } from "@/utils/pagination";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setContactData } from "@/store/slices/editContactSlice";
import ModalDelete from "../Commons/ModalDelete/ModalDelete";
import { toast } from "react-toastify";

export default function List() {
  // hooks
  const route = useRouter();

  // redux
  const dispatch = useDispatch();

  // useState
  const [list, setList] = useState<ContactType[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isLoadingGetDetail, setIsLoadingGetDetail] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<ContactType>();
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  // state
  const filteredData = useMemo(
    () =>
      list.filter(
        (e) =>
          e.firstName.toLowerCase().includes(search.toLowerCase()) ||
          e.lastName.toLowerCase().includes(search.toLowerCase())
      ),
    [list, search]
  );

  const data = useMemo(() => {
    const { limit, offset } = getPagination(page);
    if (search) {
      return filteredData.slice(offset, offset + limit);
    }
    return list.slice(offset, offset + limit);
  }, [filteredData, list, page, search]);

  const { isFirstPage, isLastPage } = useMemo(() => {
    let total = list.length;
    if (search) {
      total = filteredData.length;
    }

    return getPage(total, page);
  }, [filteredData.length, list.length, page, search]);

  // function
  const fetchList = () => {
    getListContactApi()
      .then((res) => setList(res.data))
      .catch(() => toast.error("Something is wrong!"))
      .finally(() => setIsLoadingList(false));
  };

  const fetchDetail = useCallback(
    (id?: string) => {
      if (id) {
        setIsLoadingGetDetail(true);
        getDetailContactApi(id)
          .then((res) => {
            dispatch(setContactData({ ...res.data }));
            route.push(`/edit/${id}`);
          })
          .catch(() => toast.error("Something is wrong!"))
          .finally(() => {
            setIsLoadingGetDetail(false);
          });
      }
    },
    [dispatch, route]
  );

  const fetchDelete = useCallback((id?: string) => {
    if (id) {
      deleteContactApi(id)
        .then(() => toast.success("Success Delete Contact!"))
        .catch(() => toast.error("Something is wrong!"))
        .finally(() => fetchList());
    }
  }, []);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const onSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const onAddContact = () => {
    route.push("/add");
  };

  const onEditContact = useCallback(
    (val: ContactType) => {
      fetchDetail(val.id);
    },
    [fetchDetail]
  );

  const onPressDelete = useCallback((val: ContactType) => {
    setSelectedData(val);
    setOpenModalDelete(true);
  }, []);

  const onDelete = useCallback(
    (val?: ContactType) => {
      fetchDelete(val?.id);
    },
    [fetchDelete]
  );

  // useEffect
  useEffect(() => {
    setIsLoadingList(true);
    fetchList();
  }, []);

  // render
  const breadcrumb = useMemo(() => {
    return (
      <Breadcrumbs>
        <BreadcrumbItem isDisabled>Main</BreadcrumbItem>
        <BreadcrumbItem>Contact List</BreadcrumbItem>
      </Breadcrumbs>
    );
  }, []);

  const renderContent = useMemo(() => {
    if (isLoadingList) {
      return (
        <CardBody className="p-10">
          <Spinner size="lg" />
        </CardBody>
      );
    }

    if (!data.length) {
      return (
        <CardBody className="p-10 text-lg font-semibold text-center">
          No data found
        </CardBody>
      );
    }

    return (
      <CardBody className="grid xl:grid-cols-4 sm:grid-cols-2 gap-8">
        {data.map((item) => (
          <ContactCard
            key={item.id}
            data={item}
            onPress={onEditContact}
            onPressDelete={onPressDelete}
            isDisabled={isLoadingGetDetail}
          />
        ))}
      </CardBody>
    );
  }, [data, isLoadingGetDetail, isLoadingList, onEditContact, onPressDelete]);

  return (
    <main className="flex min-h-screen flex-col lg:p-12 sm:p-8 gap-4">
      {breadcrumb}
      <Card fullWidth>
        <CardHeader className="flex flex-row justify-between items-center flex-wrap gap-4">
          <div role="contact-list" className="text-xl font-bold ">Contact List</div>
          <div className="flex flex-row gap-4 items-center">
            <Input
              type="text"
              placeholder="Search"
              startContent={<FaSearch />}
              value={search}
              onValueChange={onSearch}
            />
            <Button isIconOnly onClick={onAddContact}>
              <FaPlus />
            </Button>
          </div>
        </CardHeader>
        <Divider />
        {renderContent}
        <Divider />
        <CardFooter className="flex flex-row justify-center gap-4">
          <Button isIconOnly isDisabled={isFirstPage} onClick={prevPage}>
            <FaChevronLeft />
          </Button>

          <Button isIconOnly isDisabled={isLastPage} onClick={nextPage}>
            <FaChevronRight />
          </Button>
        </CardFooter>
      </Card>

      <ModalDelete
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        data={selectedData}
        onAction={onDelete}
      />
    </main>
  );
}
