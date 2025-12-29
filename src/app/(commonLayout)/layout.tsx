// app/(commonLayout)/layout.tsx

import Navbar from "../../components/shared/Navbar";


export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <Navbar></Navbar>
      <main className="min-h-screen">{children}</main>

    </>
  );
}
