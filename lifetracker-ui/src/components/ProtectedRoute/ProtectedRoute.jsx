import AccessForbidden from "../AccessForbidden/AccessForbidden";
import { useAuthContext } from "../../contexts/auth";

export default function ProtectedRoute({ element }) {
  const { user, initialized } = useAuthContext();

  if (!initialized) return null;

  if (!user?.email) {
    return <AccessForbidden />;
  }

  return <>{element}</>;
}
