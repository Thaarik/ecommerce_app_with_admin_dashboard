import React, { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // TODO: Check if the user is authenticated and if user is authenticated, check whether the user role is Admin
  return <div>{children}</div>;
}
