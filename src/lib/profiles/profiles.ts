import { GetServerSidePropsContext } from "next";
import useSWR, {Key, mutate} from "swr";
import useSWRMutation from "swr/mutation";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getPagination } from "@/lib/pagination/getPagination";

const resource = "profiles";
const resourceWithMetadata = "profiles_with_metadata";

export function useProfiles(page: number, limit: number, fallbackData?: any) {
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

export function useProfile(id: string, fallbackData?: any) {
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

export function useUpdateProfile(id: string) {
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
    },
  });

  return {...data, error, trigger, reset, isMutating};
}

export async function fetchServerSideProfiles(context: GetServerSidePropsContext, page?: number, limit?: number) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResources(supabase, page, limit);
}

export async function fetchServerSideProfilesWithMetadata(context: GetServerSidePropsContext, page?: number, limit?: number) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResourcesWithMetadata(supabase, page, limit);
}

export async function fetchServerSideProfile(context: GetServerSidePropsContext, id: string) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResource(supabase, id);
}

export async function fetchServerSideProfileWithMetadata(context: GetServerSidePropsContext, id: string) {
  const supabase = createServerSupabaseClient(context);
  return await fetchResourceWithMetadata(supabase, id);
}

async function fetchResources(supabase: any, page = 1, limit = 10) {
  const { from, to } = getPagination(page, limit);

  return supabase
    .from(resource)
    .select("*", { count: "exact" })
    .range(from, to);
}

async function fetchResourcesWithMetadata(supabase: any, page = 1, limit = 10) {
  const { from, to } = getPagination(page, limit);

  return supabase
    .from(resourceWithMetadata)
    .select("*", { count: "exact" })
    .range(from, to);
}

async function fetchResource(supabase: any, id: string) {
  return supabase.from(resource).select("*").eq("id", id).single();
}

async function fetchResourceWithMetadata(supabase: any, id: string) {
  return supabase.from(resource).select("*, questions_count:questions(count), answers_count:answers(count)").eq("id", id).single();
}

async function updateResource(supabase: any, id: any, data: any) {
  return supabase.from(resource).update(data).eq("id", id).select().single();
}
