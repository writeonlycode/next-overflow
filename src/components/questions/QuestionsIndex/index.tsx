import QuestionCard from "@/components/questions/_shared/QuestionCard";

export default function QuestionsIndex({ questions }: any) {
  return questions.map((question: any) => (
    <QuestionCard key={question.id} question={question} />
  ));
}
