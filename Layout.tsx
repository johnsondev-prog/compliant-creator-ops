import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/" className="brand">
          {import.meta.env.VITE_APP_NAME || 'Minimalist Creator Ops'}
        </Link>
        <nav className="nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
        <div className="auth-slot">
          {hasClerk ? (
            <>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="button button-secondary">Sign in</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            <span className="badge">Add Clerk key to enable auth</span>
          )}
        </div>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
