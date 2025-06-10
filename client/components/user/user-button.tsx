import { User } from "@heroui/react";
import { User as UserProps } from "@/types";

export default function UserButton() {
  return (
    <User
      as='button'
      avatarProps={{
        isBordered: true,
        src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      }}
      className='transition-transform'
      description='@tonyreichert'
      name='Tony Reichert'
    />
  );
}