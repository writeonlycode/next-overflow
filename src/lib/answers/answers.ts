import { GetServerSidePropsContext } from "next";
import useSWR, { Key, mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getPagination } from "@/lib/pagination/getPagination";

const resource = "answers";
const resourceWithMetadata = "answers_with_metadata";

export function useAnswers(question_id: string, page: number, limit: number, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResources(supabase, question_id, page, limit);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resource, fetcher, { fallbackData });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useAnswersWithMetadata(question_id: string, page?: number, limit?: number, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResourcesWithMetadata(supabase, question_id, page, limit);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resourceWithMetadata, fetcher, { fallbackData });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useAnswer(id: string, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResource(supabase, id);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resource + "/" + id, fetcher, { fallbackData });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useAnswerWithMetadata(id: string, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResourceWithMetadata(supabase, id);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resourceWithMetadata + "/" + id, fetcher, { fallbackData });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useInsertAnswer() {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string, { arg }: any) => {
    const response = await insertResource(supabase, arg);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>(resource, fetcher, {
    onSuccess: () => {
      mutate(resourceWithMetadata);
    },
  });

  return {...data, error, trigger, reset, isMutating};
}

export function useUpdateAnswer(id: any) {
  const supabase = useSupabaseClient();

  const fetcher = async (_key: string, { arg }: any) => {
    const response = await updateResource(supabase, id, arg);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>(resource + "/" + id, fetcher, {
    onSuccess: () => {
      mutate(resource);
      mutate(resourceWithMetadata);
      mutate(resourceWithMetadata + "/" + id);
    },
  });

  return {...data, error, trigger, reset, isMutating};
}

export function useDeleteAnswer(id: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await deleteResource(supabase, id);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, trigger, reset, isMutating } = useSWRMutation<any, any, Key, any>(resource, fetcher, {
    onSuccess: () => {
      mutate(resourceWithMetadata);
    },
  });

  return {...data, error, trigger, reset, isMutating};
}

export async function fetchServerSideAnswers(context: GetServerSidePropsContext, question_id: string, page?: number, limit?: number) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResources(supabase, question_id, page, limit);
}

export async function fetchServerSideAnswersWithMetadata(context: GetServerSidePropsContext, question_id: string, page?: number, limit?: number) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResourcesWithMetadata(supabase, question_id, page, limit);
}

export async function fetchServerSideAnswer(context: GetServerSidePropsContext, id: string) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResource(supabase, id);
}

export async function fetchServerSideAnswerWithMetadata(context: GetServerSidePropsContext, id: string) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResourceWithMetadata(supabase, id);
}

async function fetchResources(supabase: any, question_id: string, page = 1, limit = 10) {
  const { from, to } = getPagination(page, limit);

  return supabase
    .from(resource)
    .select("*", { count: "exact" })
    .eq("question_id", question_id)
    .order("created_at", { ascending: false })
    .range(from, to);
}

async function fetchResourcesWithMetadata(supabase: any, question_id: string, page = 1, limit = 10) {
  const { from, to } = getPagination(page, limit);

  return supabase
    .from(resourceWithMetadata)
    .select("*, profile:profiles_with_metadata(*), current_user_answer_vote(*)", { count: "exact" })
    .eq("question_id", question_id)
    .order("created_at", {ascending: false})
    .range(from, to);
}

async function fetchResource(supabase: any, id: string) {
  return supabase.from(resource).select("*").eq("id", id).single();
}

async function fetchResourceWithMetadata(supabase: any, id: string) {
  return supabase
    .from(resourceWithMetadata)
    .select("*, profile:profiles_with_metadata(*), current_user_answer_vote(*)")
    .eq("id", id)
    .single();
}

async function insertResource(supabase: any, data: any) {
  return supabase.from(resource).insert(data).select().single();
}

async function updateResource(supabase: any, id: any, data: any) {
  return supabase.from(resource).update(data).eq("id", id).select().single();
}

async function deleteResource(supabase: any, id: any) {
  return supabase.from(resource).delete({ count: "exact" }).eq("id", id);
}
