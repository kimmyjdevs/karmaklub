import { SignIn } from '@clerk/nextjs';

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white">
            Karma Club
          </h1>
          <p className="font-mono text-xs text-text-secondary mt-2 uppercase tracking-widest">
            Admin Access
          </p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
