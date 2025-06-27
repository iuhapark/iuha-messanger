'use client';

import UserList from '@/components/user/list';
import { Card, CardBody, CardFooter, CardHeader, Divider, Pagination } from '@heroui/react';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/types';
import { parseAPIError } from '@/utils/error';

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
    <Card className='md:w-[480px] w-[90vw] p-3' style={{ backgroundColor: 'var(--aside-background)' }}>
      <CardHeader className='flex gap-3'>
        <h1 className='text-lg font-semibold'>{total} users</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <UserList users={users} />
      </CardBody>
      <CardFooter className='flex justify-center'>
        <Pagination
          initialPage={1}
          page={page}
          total={totalPages}
          showControls
          color='default'
          onChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
