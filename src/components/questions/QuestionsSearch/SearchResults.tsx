import QuestionCard from "@/components/questions/_shared/QuestionCard";

export default function SearchResults({ questions }: any) {
  return (
    <>
      <h2 className="text-xl mb-2">{questions.length} results</h2>
      <ul className="search-results">
        {questions?.map((question: any) => {
          return <QuestionCard key={question.id} question={question} />;
        })}
      </ul>
    </>
  );
}
