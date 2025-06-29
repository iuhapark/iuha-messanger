'use client';

import UserList from "@/components/user/user-list";
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
    <Card className='follower h-[750px]'>
      <Switch
        className='mb-4'
        size='sm'
        color='success'
        isSelected={isVertical}
        onValueChange={setIsVertical}
      >
        {isVertical ? 'Vertical view' : 'Horizontal view'}
      </Switch>

      <Tabs
        aria-label='Options'
        isVertical={isVertical}
        variant='underlined'
        fullWidth
        classNames={{
          panel: 'h-[660px] overflow-hidden',
        }}
      >
        <Tab key='followers' title='Followers'>
          <div className='h-full'>
            <UserList />
          </div>
        </Tab>
        <Tab key='following' title='Following'>
          <div className='h-full'>
            <UserList />
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
};

export default Folloing;
