"use client";
import React from "react";
import {Tabs, Tab, Card, CardBody, Switch, Avatar, Spacer} from "@heroui/react";
import {useAuth} from "@/context/authContext";
import {useLoading} from "@/context/loadingContext";
import api from "@/lib/api";
import {User} from "@/types";
import {parseAPIError} from "@/utils/error";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Loading from "../loading/circular";
import PersonalInfo from "../../app/account/information/page";
import FriendsPage from "@/app/friends/page";
import Security from "@/app/account/security/page";

export default function AccountTab() {
  const [isVertical, setIsVertical] = React.useState(true);
  const {user} = useAuth();
  const {loading, setLoading} = useLoading();
  const [me, setMe] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<User>();

  useEffect(() => {
    const fetchUser = async (user: User) => {
      try {
        const res = await api.get(`/users/${user?.id}`);
        setMe(res.data);
        reset({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          name: res.data.name,
          password: '',
        });
      } catch (err) {
        parseAPIError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) { fetchUser(user);}}, [user, reset]);
    if (loading) return <Loading />;

  return (
    <div className='flex flex-col px-4'>
      <Switch className='mb-4' size='sm' color='default' isSelected={isVertical} onValueChange={setIsVertical}>
        {isVertical ? 'Vertical view' : 'Horizontal view'}
      </Switch>
      <div className='flex w-full flex-col'>

        <Spacer y={4} />
        <Tabs aria-label='Options' isVertical={isVertical} variant='light'
        className='basis-2/5'
         classNames={{
          tabContent: 'group-data-[selected=true]:text-[var(--active-bg)]',
          panel: 'basis-4/5',
        }}>
          <Tab key='personal information'   title='Personal Information'>
            <Card>
              <CardBody>
               <PersonalInfo />
              </CardBody>
            </Card>
          </Tab>
          <Tab key='security' title='Security'>
            <Card>
              <CardBody>
                <Security />
              </CardBody>
            </Card>
          </Tab>
          <Tab key='following and followers' title='Following and followers'>
            <Card>
              <CardBody>
                <FriendsPage />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
