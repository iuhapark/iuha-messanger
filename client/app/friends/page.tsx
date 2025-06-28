'use client';

import UserList from '@/components/user/list';
import { Card, CardBody, Pagination } from '@heroui/react';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/types';
import { parseAPIError } from '@/utils/error';
import clsx from 'clsx';
import { subtitle } from '@/components/primitives';

export default function FriendsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchUsers = async (currentPage: number) => {
    try {
      const res = await api.get(`/users/user-list?page=${currentPage - 1}`);
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.totalElements);
    } catch (err) {
      parseAPIError(err);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
  <div className='max-w-md w-[280px] flex flex-col items-center justify-center gap-4 py-10'>
    <div className={clsx('font-bold', subtitle())}>Users of iuha</div>
    <div className='self-start text-sm text-default-600'>{total} users</div>

    <Card className='w-full min-h-[356px] border' style={{ backgroundColor: 'var(--aside-background)' }}>
      <CardBody>
        <UserList users={users} />
      </CardBody>
    </Card>

    <Card className='w-full h-12 border bg-transparent flex items-center justify-center'>
      <Pagination
        initialPage={1}
        page={page}
        total={totalPages}
        showControls
        color='primary'
        onChange={setPage}
      />
    </Card>
  </div>
  );
}
