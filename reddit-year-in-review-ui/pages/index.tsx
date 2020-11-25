import { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Index page re-routing is just a saftey net.
    // This re-routing is also forced on the server-side
    router.replace("/month/1");
  }, []);

  return null;
};

export default Index;
