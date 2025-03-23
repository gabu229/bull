import Link from "next/link";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface LinkButtonProps {
  href?: string;
  target?: string;
  children: ReactNode;
}

const LinkButton = ({
  href = "",
  target = "_blank",
  children,
}: LinkButtonProps) => {
  return (
    <>
      <Link href={href} passHref target={target} rel="noopener noreferrer">
        <Button
          className="flex px-7 py-3 bg-secondary/20 text-foreground rounded-full items-center gap-2 overflow-hidden max-w-dvw"
          variant={"link"}
        >
          {children}
        </Button>
      </Link>
    </>
  );
};

export default LinkButton;
