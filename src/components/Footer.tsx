import PrimaryLink from "./PrimaryLink";

export function Footer() {
  return (
    <footer className="dark:bg-gray-900 container mx-auto grid h-24 grid-cols-3 items-center text-center">
        <PrimaryLink href="/">IconGenerator.com</PrimaryLink>
        <PrimaryLink href="/privacy-policy">Privacy Policy</PrimaryLink>
        <PrimaryLink href="/terms-of-service">Terms of Service</PrimaryLink>
    </footer>
  );
}