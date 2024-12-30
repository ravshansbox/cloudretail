/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './components/Button';
import { Label } from './components/Label';
import { Form } from './components/Form';
import { Input } from './components/Input';

export const Login: FC = () => {
  const form = useForm();

  return (
    <Form
      className="mx-auto mt-8 max-w-md"
      onSubmit={form.handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Label text="Username">
        <Input type="text" {...form.register('username')} />
      </Label>
      <Label text="Password">
        <Input type="password" {...form.register('password')} />
      </Label>
      <Button>Login</Button>
    </Form>
  );
};
