'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '@/actions/login';
import { initialState } from '@/types/action-state';
import Alert from '../alert';
import Button from '../button';
import Input from '../input';
import { LoginFormData, LoginSchema } from './schema';

const LoginForm = () => {
  const [state, formAction, pending] = useActionState(login, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    startTransition(() => formAction(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {state.message && <Alert>{state.message}</Alert>}

      <div>
        <Input placeholder="user@example.com" disabled={pending} {...register('email')} />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Input type="password" placeholder="******" disabled={pending} {...register('password')} />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <Button disabled={pending} loading={pending}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
