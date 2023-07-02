import { GetServerSidePropsContext } from "next";
import useSWR, { Key, mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getPagination } from "@/lib/pagination/getPagination";

const resource = "questions";
const resourceWithMetadata = "questions_with_metadata";

export function useQuestions(page: number, limit: number, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResources(supabase, page, limit);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resource, fetcher, { fallbackData, revalidateOnMount: false });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useQuestionsWithMetadata(page: number, limit: number, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResourcesWithMetadata(supabase, page, limit);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resourceWithMetadata, fetcher, { fallbackData, revalidateOnMount: false });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useQuestionsWithMetadataSearch(query: string, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResourcesWithMetadataSearch(supabase, query);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resourceWithMetadata + "/search", fetcher, { fallbackData, revalidateOnMount: false });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useQuestion(id: string, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResource(supabase, id);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resource + "/" + id, fetcher, { fallbackData, revalidateOnMount: false });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useQuestionWithMetadata(id: string, fallbackData?: any) {
  const supabase = useSupabaseClient();

  const fetcher = async () => {
    const response = await fetchResourceWithMetadata(supabase, id);

    if (response.error) {
      throw response.error;
    }

    return response;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(resourceWithMetadata + "/" + id, fetcher, { fallbackData, revalidateOnMount: false });
  return { ...data, error, isLoading, isValidating, mutate };
}

export function useInsertQuestion() {
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

export function useUpdateQuestion(id: any) {
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

export function useDeleteQuestion(id: any) {
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

export async function fetchServerSideQuestions(context: GetServerSidePropsContext, page?: number, limit?: number) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResources(supabase, page, limit);
}

export async function fetchServerSideQuestionsWithMetadata(context: GetServerSidePropsContext, page?: number, limit?: number) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResourcesWithMetadata(supabase, page, limit);
}

export async function fetchServerSideQuestionsWithMetadataSearch(context: GetServerSidePropsContext, query: string) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResourcesWithMetadataSearch(supabase, query);
}

export async function fetchServerSideQuestion(context: GetServerSidePropsContext, id: string) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResource(supabase, id);
}

export async function fetchServerSideQuestionWithMetadata(context: GetServerSidePropsContext, id: string) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResourceWithMetadata(supabase, id);
}

async function fetchResources(supabase: any, page = 1, limit = 10) {
  const { from, to } = getPagination(page, limit);

  return supabase
    .from(resource)
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);
}

async function fetchResourcesWithMetadata(supabase: any, page = 1, limit = 10) {
  const { from, to } = getPagination(page, limit);

  return supabase
    .from(resourceWithMetadata)
    .select("*, profile:profiles_with_metadata(*), current_user_question_vote:questions_votes(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);
}

async function fetchResourcesWithMetadataSearch(supabase: any, query: string) {
  return supabase
    .from("questions_with_metadata")
    .select("*, profile:profiles_with_metadata(*), current_user_question_vote:questions_votes(*)", { count: "exact" })
    .textSearch("title_body", query);
}

async function fetchResource(supabase: any, id: string) {
  return supabase.from(resource).select("*").eq("id", id).single();
}

async function fetchResourceWithMetadata(supabase: any, id: string) {
  return supabase
    .from(resourceWithMetadata)
    .select("*, profile:profiles_with_metadata(*), current_user_question_vote(*)")
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
