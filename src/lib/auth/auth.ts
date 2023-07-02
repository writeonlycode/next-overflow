import { Key } from "swr";
import useSWRMutation from "swr/mutation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function useSignUp() {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string, { arg }: any) => {
    const response = await supabase.auth.signUp(arg);

    if (response.error) {
      throw response.error.message;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("users", fetcher);

  return { ...data, error, trigger, reset, isMutating };
}

export function useUpdateUser() {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string, { arg }: any) => {
    const response = await supabase.auth.updateUser(arg);

    if (response.error) {
      throw response.error.message;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("users", fetcher);

  return { ...data, error, trigger, reset, isMutating };
}

export function useSignIn() {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string, { arg }: any) => {
    const response = await supabase.auth.signInWithPassword(arg);

    if (response.error) {
      throw response.error.message;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("sessions", fetcher);

  return { ...data, error, trigger, reset, isMutating };
}

export function useSignOut() {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string) => {
    const response = await supabase.auth.signOut();

    if (response.error) {
      throw response.error.message;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("sessions", fetcher);

  return { ...data, error, trigger, reset, isMutating };
}

export function useResetPassword() {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string, { arg }: any) => {
    const response = await supabase.auth.resetPasswordForEmail(arg);

    if (response.error) {
      throw response.error.message;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("sessions", fetcher);

  return { ...data, error, trigger, reset, isMutating };
}
