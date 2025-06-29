'use client';

import UserList from '@/components/user/user-list';
import api from '@/lib/api';
import { User } from '@/types';
import { parseAPIError } from '@/utils/error';
import { Card, Pagination, Spacer } from '@heroui/react';
import { useEffect, useState } from 'react';

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
  <div className='flex flex-col items-center justify-center h-full'>
    <Spacer y={20} />
    <h1 className='text-2xl font-bold mb-4'>Friends</h1>
      {total} users
    <UserList />    
    {/* <Card className='w-full h-12 border bg-transparent flex items-center justify-center'>
      <Pagination
        initialPage={1}
        page={page}
        total={totalPages}
        showControls
        color='primary'
        onChange={setPage}
      />
    </Card> */}
  </div>
  );
}
