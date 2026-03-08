import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, useQuery } from "wasp/client/operations";

export const useRequireAdmin = (): { isLoading: boolean; isAdmin: boolean } => {
  const navigate = useNavigate();
  const { data: me, isLoading } = useQuery(getMe);

  useEffect(() => {
    if (isLoading || me === undefined) return;
    if (me === null || !me.isAdmin) {
      navigate("/no-access", { replace: true });
    }
  }, [me, isLoading, navigate]);

  return {
    isLoading,
    isAdmin: me?.isAdmin ?? false,
  };
};
