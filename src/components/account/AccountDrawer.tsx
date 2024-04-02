"use client";

import { useEffect, useState } from "react";
import { Drawer } from "antd";
import UserProvider from "./UserProvider";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const AccountDrawer = () => {
  const [openLeft, setOpenLeft] = useState(true);
  const session = useSession()

  useEffect(() => {
     if (session?.status === "authenticated") {
      setOpenLeft(false)
      toast.success("Logged In Successful");
     }

  },[session?.status])

  return (
    <div>
      <Drawer
        closable={false}
        placement="left"
        open={openLeft}
        width={350}
        className="z-40 shadow-xl relative"
      >
        <UserProvider />
      </Drawer>
    </div>
  );
};

export default AccountDrawer;
