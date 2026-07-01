import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="mb-8 text-center">
        <p className="font-display font-bold text-3xl uppercase tracking-widest text-white">
          Karma Club
        </p>
        <p className="font-mono text-xs text-text-secondary mt-2 uppercase tracking-widest">
          Sign In
        </p>
      </div>
      <SignIn />
    </div>
  );
}
