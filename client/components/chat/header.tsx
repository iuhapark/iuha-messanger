import { User } from "@/types";
import { Avatar, Tooltip } from "@heroui/react";
import { PrevArrowIcon } from "../icons/icons";

type Receiver = {
  receiver: User;
  onOpen?: () => void;
  isOpen: boolean;
};

const MessageHeader = ({ receiver, onOpen, isOpen }: Receiver) => (
  <div className='message-header'>
    {!isOpen && (
      <div className='flex md:hidden'>
        <Tooltip content='Open' placement='right'>
          <button className='btn-aside' onClick={onOpen}>
            <PrevArrowIcon />
          </button>
        </Tooltip>
      </div>
    )}
    <Avatar
      showFallback
      name={receiver?.name}
      src={receiver?.profile}
      alt={receiver?.name}
      className='avatar'
    />
    <h1 className='flex-col'>{receiver?.name}</h1>
  </div>
);


export default MessageHeader;