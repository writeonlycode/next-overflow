import { SyntheticEvent } from "react";
import { useRouter } from "next/router";
import { useDeleteQuestion } from "@/lib/questions/questions";
import Loading from "@/components/icons/Loading";

export default function QuestionDelete({ id }: any) {
  const router = useRouter();

  const { trigger, count, error, isMutating } = useDeleteQuestion(id);

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    await trigger();
  };

  if (count) {
    router.push("/questions");
  }

  if (error) {
    console.error(error);
  }

  const loadingElement = (
    <span className="absolute inset-0 bg-aurora-0 rounded flex items-center justify-center">
      <Loading className="animate-spin w-3 h-3" />
    </span>
  );

  return (
    <button
      onClick={handleClick}
      className="relative text-sm bg-aurora-0 hover:bg-aurora-0/90 ease-in duration-100 rounded px-2"
      disabled={isMutating || count}
    >
      <span>Delete</span>
      {(isMutating || count) && loadingElement}
    </button>
  );
}
