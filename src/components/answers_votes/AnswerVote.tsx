// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
// import Loading from "../icons/Loading";
// import IconHandThumbUp from "../icons/IconHandThumbUp";
// import IconHandThumbDown from "../icons/IconHandThumbDown";

// export default function AnswerVote({ answer_id, answers_votes }: any) {
//   const supabase = useSupabaseClient();
//   const user = useUser();
//   const router = useRouter();

//   const [currentVote, setCurrentVote] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleUpVote = async () => {
//     setIsLoading(true);

//     const { error } = await supabase
//       .from("answers_votes")
//       .upsert(
//         { answer_id, profile_id: user?.id, vote: true },
//         { onConflict: "profile_id,answer_id", ignoreDuplicates: false }
//       );

//     if (error) {
//       console.log(error);
//     }

//     router.reload();
//   };

//   const handleDownVote = async () => {
//     setIsLoading(true);

//     const { error } = await supabase
//       .from("answers_votes")
//       .upsert(
//         { answer_id, profile_id: user?.id, vote: false },
//         { onConflict: "profile_id,answer_id", ignoreDuplicates: false }
//       );

//     if (error) {
//       console.log(error);
//     }

//     router.reload();
//   };

//   const handleDeleteVote = async () => {
//     setIsLoading(true);

//     const { error } = await supabase
//       .from("answers_votes")
//       .delete()
//       .eq("profile_id", user?.id)
//       .eq("answer_id", answer_id);

//     if (error) {
//       console.log(error);
//     }

//     router.reload();
//   };

//   useEffect(() => {
//     const userVote = answers_votes?.filter(
//       (vote: any) => user?.id === vote.profile_id
//     );

//     if (userVote?.length) {
//       setCurrentVote(userVote[0].vote);
//     }
//   }, [answers_votes, user]);

//   return (
//     <div className="absolute -left-8 flex items-center flex-col">
//       <button
//         className={currentVote === true ? "text-frost-0" : ""}
//         disabled={isLoading}
//         onClick={currentVote === true ? handleDeleteVote : handleUpVote}
//       >
//         <IconHandThumbUp />
//       </button>
//       <span className="text-xl font-bold">
//         {answers_votes?.filter((vote: any) => vote.vote).length -
//           answers_votes?.filter((vote: any) => !vote.vote).length}
//       </span>
//       <button
//         className={currentVote === false ? "text-aurora-0" : ""}
//         disabled={isLoading}
//         onClick={currentVote === false ? handleDeleteVote : handleDownVote}
//       >
//         <IconHandThumbDown />
//       </button>
//       {isLoading ? (
//         <div className="absolute -inset-1 flex items-center justify-center rounded bg-night-1/50">
//           <Loading />
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }
