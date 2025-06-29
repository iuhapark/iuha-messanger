'use client';
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons/icons";

const PasswordInput = ({
  onUpdate,
}: {
  onUpdate: (data: { password: string }) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ password: string }>({
    defaultValues: { password: '' },
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data: { password: string }) => {
    if (!data.password) return;
    onUpdate(data);
    reset();
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-row gap-2 max-w-xs items-end w-full px-4'>
      <Input
        label='Password'
        type={isVisible ? 'text' : 'password'}
        labelPlacement='outside'
        size='sm'
        radius='full'
        {...register("password")}
        endContent={
          <button
            type='button'
            onClick={toggleVisibility}
            aria-label='toggle password visibility'
            className='focus:outline-none'
          >
            {isVisible ? (
              <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
            ) : (
              <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
            )}
          </button>
        }
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <Button type='submit' size='sm' className='btn-secondary h-[2rem] justify-center'>Update</Button>
    </form>
  );
};

export default PasswordInput;
