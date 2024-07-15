import { Inter } from "next/font/google";
import Router from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    const getPageList = async () => {
      if (Router.router?.pageLoader?.getPageList) {
        const list = await Router.router.pageLoader.getPageList();
        console.log({ list });
      }
    };

    getPageList();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      next.js
    </main>
  );
}
