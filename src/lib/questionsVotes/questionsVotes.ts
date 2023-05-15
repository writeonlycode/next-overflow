import { Key, mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const resource = "questions_votes";

export function useUpsertQuestionVote(profile_id: string, question_id: string) {
  const supabase = useSupabaseClient();

  const fetcher = async (key: string, { arg }: any) => {
    const response = await upsertResource(supabase, profile_id, question_id, arg);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const {data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("question_votes", fetcher, {
    onSuccess: () => {
      mutate("questions_votes");
      mutate("questions");
      mutate("questions/" + question_id);
      mutate("questions_with_metadata");
      mutate("questions_with_metadata/" + question_id);
    },
  });

  return { ...data, error, trigger, reset, isMutating };
}

export function useDeleteQuestionVote(profile_id: string, question_id: string) {
  const supabase = useSupabaseClient();

  const fetcher = async (key: string) => {
    const response = await deleteResource(supabase, profile_id, question_id);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>("question_votes", fetcher, {
    onSuccess: () => {
      mutate("questions_votes");
      mutate("questions");
      mutate("questions/" + question_id);
      mutate("questions_with_metadata");
      mutate("questions_with_metadata/" + question_id);
    },
  });

  return {...data, error, trigger, reset, isMutating};
}

async function upsertResource(supabase: any, profile_id: string, question_id: string, data: any) {
  return supabase
    .from(resource)
    .upsert(data, { onConflict: "profile_id,question_id" } )
    .eq("profile_id", profile_id)
    .eq("question_id", question_id)
    .select()
    .single();
}

async function deleteResource(supabase: any, profile_id: string, question_id: string) {
  return supabase
    .from(resource)
    .delete()
    .eq("profile_id", profile_id)
    .eq("question_id", question_id);
}
