import { Key, mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const resource = "answers_votes";

export function useUpsertAnswerVote(profile_id: string, answer_id: string) {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string, { arg }: any) => {
    const response = await upsertResource(supabase, profile_id, answer_id, arg);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const {data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("answer_votes", fetcher, {
    onSuccess: () => {
      mutate("answers_votes");
      mutate("answers");
      mutate("answers/" + answer_id);
      mutate("answers_with_metadata");
      mutate("answers_with_metadata/" + answer_id);
    },
  });

  return { ...data, error, trigger, reset, isMutating };
}

export function useDeleteAnswerVote(profile_id: string, answer_id: string) {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string) => {
    const response = await deleteResource(supabase, profile_id, answer_id);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("answer_votes", fetcher, {
    onSuccess: () => {
      mutate("answers_votes");
      mutate("answers");
      mutate("answers/" + answer_id);
      mutate("answers_with_metadata");
      mutate("answers_with_metadata/" + answer_id);
    },
  });

  return {...data, error, trigger, reset, isMutating};
}

async function upsertResource(supabase: any, profile_id: string, answer_id: string, data: any) {
  return supabase
    .from(resource)
    .upsert(data, { onConflict: "profile_id,answer_id" } )
    .eq("profile_id", profile_id)
    .eq("answer_id", answer_id)
    .select()
    .single();
}

async function deleteResource(supabase: any, profile_id: string, answer_id: string) {
  return supabase
    .from(resource)
    .delete()
    .eq("profile_id", profile_id)
    .eq("answer_id", answer_id);
}
