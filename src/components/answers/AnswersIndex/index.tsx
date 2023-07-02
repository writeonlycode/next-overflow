import AnswerCard from "@/components/answers/_shared/AnswerCard";

export default function AnswersIndex({ answers }: any) {
  return answers.map((answer: any) => (
    <AnswerCard key={answer.id} answer={answer} />
  ));
}
