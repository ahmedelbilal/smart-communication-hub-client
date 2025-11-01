import RegisterForm from '@/components/register-form';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="md:max-w-lg w-full h-screen mx-auto flex flex-col justify-center p-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold">Register</h1>
        <div className="flex gap-2">
          <p>Already have and account?</p>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
      <RegisterForm />
    </main>
  );
}
