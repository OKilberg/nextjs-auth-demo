import {
  profileConfig,
  profileMiddleware,
} from "@/app/(auth)/profile/profileMiddleware";
import { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  return profileMiddleware(req);
};

export const config = {
  matcher: [profileConfig.matcher],
};
