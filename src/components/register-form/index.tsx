'use client';

import { initialState } from '@/types/action-state';
import { startTransition, useActionState } from 'react';
import Alert from '../alert';
import Button from '../button';
import Input from '../input';
import { registerAction } from '@/actions/register';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, RegisterSchema } from './schema';

const RegisterForm: React.FC = () => {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    startTransition(() => formAction(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {state.message && <Alert>{state.message}</Alert>}

      <div>
        <Input type="text" placeholder="eg. Ahmed" disabled={pending} {...register('name')} />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Input placeholder="user@example.com" disabled={pending} {...register('email')} />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Input type="password" placeholder="******" disabled={pending} {...register('password')} />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <Button disabled={pending} loading={pending}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
