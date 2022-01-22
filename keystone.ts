// Config options in docs: https://keystonejs.com/docs/apis/config

import "dotenv/config";
import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { withAuth, session } from "./auth";

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "",
    },
    server: {
      cors: {
        origin: "*", // Allowed all origins for now, change before production
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    images: {
      upload: "local",
      local: {
        storagePath: "./public/images",
        baseUrl: "/images",
      },
    },
    lists,
    session,
  })
);
