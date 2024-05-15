import { ContactType } from "@/types";
import { Avatar, Card, CardBody, Divider, Tooltip } from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  data: ContactType;
  onPress: (data: ContactType) => void;
  onPressDelete: (data: ContactType) => void;
  isDisabled: boolean;
}
export default function ContactCard(props: Readonly<Props>) {
  const { data, onPress, onPressDelete, isDisabled } = props;

  return (
    <Card isHoverable isPressable isBlurred isDisabled={isDisabled} shadow="md">
      <CardBody className="flex flex-row justify-between items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <Avatar src={data.photo} size="lg" />
          <Divider orientation="vertical" />
          <div>
            <div className="text-md text-left font-semibold truncate">
              {data.firstName}
            </div>
            <div className="text-sm text-left font-normal truncate">
              {data.lastName}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div>
            <div className="text-xs text-center font-light">age</div>
            <div className="text-lg text-center font-bold">{data.age}</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex flex-col gap-2">
            <Tooltip content="Edit">
              <div
                className="p-2 flex justify-center items-center bg-primary rounded-lg"
                onClick={() => onPress(data)}
              >
                <FaEdit size={10} />
              </div>
            </Tooltip>
            <Tooltip content="Delete">
              <div
                className="p-2 flex justify-center items-center bg-danger rounded-lg"
                onClick={() => onPressDelete(data)}
              >
                <FaTrash size={10} />
              </div>
            </Tooltip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
