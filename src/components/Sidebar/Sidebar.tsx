import { getUserByClerkId } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";
import AuthenticatedSidebar from "./AuthenticatedSidebar";

async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return <AuthenticatedSidebar user={user} />;
}

export default Sidebar;
