'use client';
import { Button, Form, Input } from "@heroui/react";
import { useForm } from "react-hook-form";

const EmailInput = ({
  email,
  onUpdate,
}: {
  email: string;
  onUpdate: (data: { email: string }) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: { email },
  });

  const onSubmit = (data: { email: string }) => onUpdate(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='flex flex-row gap-2 max-w-xs items-end w-full px-4'>
      <Input
        required
        label='Email'
        type='email'
        labelPlacement='outside'
        size='sm'
        radius='full'
        {...register('email', {
          required: true,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email format',
          },
        })}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Button type='submit' size='sm' className='btn-secondary h-[2rem]'>Update</Button>
    </Form>
  );
};

export default EmailInput;
