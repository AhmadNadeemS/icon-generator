import Link from "next/link";
import PrimaryLink from "./PrimaryLink";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";

export default function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const { buyCredits } = useBuyCredits();
  return (
    <header className=" dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <PrimaryLink href="/">Icon Generator</PrimaryLink>
        <ul>
          <li>
            <PrimaryLink href="generate">Generate</PrimaryLink>
          </li>
        </ul>
        <ul className="flex gap-4">
          {isLoggedIn && (
            <>
              <li>
                <Button onClick={() => buyCredits()}>Buy Credits</Button>
              </li>
              <li>
                <Button variant="secondary" onClick={() => signOut()}>
                  Logout
                </Button>
              </li>
            </>
          )}
           {!isLoggedIn && (
            <li>
              <Button onClick={() => signIn()}>Login</Button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
