import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['flowbite.com', 'localhost', 'i.pravatar.cc', '192.168.5.213'],
  },
};

export default withFlowbiteReact(nextConfig);