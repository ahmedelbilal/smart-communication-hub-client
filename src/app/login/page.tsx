import LoginForm from '@/components/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="md:max-w-lg w-full h-screen mx-auto flex flex-col justify-center p-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold leading-10">Login</h1>
        <div className="flex gap-2">
          <p>Don&apos;t have an account?</p>
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
      <LoginForm />
    </main>
  );
}
