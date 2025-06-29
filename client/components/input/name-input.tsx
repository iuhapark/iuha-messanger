'use client';
import { Button, Form, Input, Spacer } from "@heroui/react";
import { useForm } from "react-hook-form";

const NameInput = ({ name, onUpdate }: { name: string; onUpdate: (data: { name: string }) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ name: string }>({
    defaultValues: { name }
  });

  const onSubmit = (data: { name: string }) => onUpdate(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='flex flex-row gap-2 max-w-xs items-end w-full px-4'>
      <Input
        isRequired
        label='Name'
        labelPlacement='outside'
        size='sm'
        radius='full'
        {...register('name', { required: true })}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Button type='submit' size='sm' className='btn-secondary h-[2rem]'>Update</Button>
    </Form>
  );
};

export default NameInput;
