import QuestionCard from "@/components/questions/shared/QuestionCard";

export default function QuestionsIndex({ questions }: any) {
  return questions.map((question: any) => (
    <QuestionCard key={question.id} question={question} />
  ));
}
