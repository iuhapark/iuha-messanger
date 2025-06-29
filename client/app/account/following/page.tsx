'use client';

import ProtectedRoute from "@/components/auth/protected-route";
import UserScroll from "@/components/user/list/scroll";
import api from "@/lib/api";
import { User } from "@/types";
import { parseAPIError } from "@/utils/error";
import { Card, Switch, Tab, Tabs } from "@heroui/react";
import React, { useEffect, useState } from "react";

const Folloing = () => {
  const [isVertical, setIsVertical] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async (currentPage: number) => {
    try {
      const res = await api.get(`/users/user-list?page=${currentPage - 1}`);
      setUsers(res.data.content);
    } catch (err) {
      parseAPIError(err);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <ProtectedRoute>
      <Card className='follower'>
        <Tabs
          aria-label='Options'
          isVertical={isVertical}
          variant='underlined'
          fullWidth
          classNames={{
            panel: 'overflow-hidden',
          }}
        >
          <Tab key='followers' title='Followers'>
            <div className='h-full'>
              <UserScroll />
            </div>
          </Tab>
          <Tab key='following' title='Following'>
            <div className='h-full'>
              <UserScroll />
            </div>
          </Tab>
        </Tabs>
      </Card>
    </ProtectedRoute>
  );
};

export default Folloing;
