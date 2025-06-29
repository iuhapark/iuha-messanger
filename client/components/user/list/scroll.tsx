'use client';

import { useLoading } from "@/context/loadingContext";
import { User } from "@/types";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import ModalAvatar from "../../avatar/modal";
import Detail from "../detail";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import api from "@/lib/api";

const PAGE_SIZE = 20;

const UserScroll = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const pageRef = useRef(0);
  const [hasMore, setHasMore] = useState(true);
  const { loading, setLoading } = useLoading();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/users/user-list?page=${pageRef.current}&size=${PAGE_SIZE}`);
      const { content, last } = res.data;

      setUsers((prev) => [
        ...prev,
        ...content.filter((user: User) => !prev.some((u) => u.id === user.id)),
      ]);

      pageRef.current += 1;
      setHasMore(!last);
    } catch (err) {
      console.error("User load error", err);
    } finally {
      setLoading(false);
    }
  };

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: fetchUsers,
  });

  useEffect(() => {
    fetchUsers(); // 최초 로딩
  }, []);

  const onSelect = (user: User) => setSelectedUser(user);

  return (
    <div className="flex w-full h-full md:min-w-[508px] min-w-[354px]">
      <div
        className="w-full max-h-[494px] overflow-y-auto"
        ref={scrollerRef as React.RefObject<HTMLDivElement>}
      >
        <Table
          hideHeader
          shadow="none"
          aria-label="User list table"
          classNames={{
            wrapper: "bg-transparent",
          }}
          bottomContent={
            hasMore ? (
              <div className="flex w-full justify-center py-4">
                <Spinner ref={loaderRef} color="default" />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn key="user">User</TableColumn>
            <TableColumn key="status">Follow</TableColumn>
          </TableHeader>
          <TableBody isLoading={loading} loadingContent={<Spinner label="Loading..." />}>
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => onSelect(user)}
                className="cursor-pointer hover:bg-default-100"
              >
                <TableCell className="w-full pr-4">
                  <div className="flex items-center gap-4">
                    <ModalAvatar user={user} />
                    <div className="flex flex-col">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-xs text-default-600">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[1%] text-right">
                  <Button radius="full" size="sm" className="btn-primary">
                    Follow
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedUser && (
        <Detail
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserScroll;
