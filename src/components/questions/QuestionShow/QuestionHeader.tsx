import { useEffect, useState } from "react";
import QuestionVotes from "@/components/questions/_shared/QuestionVotes";
import IconCalendar from "@/components/icons/IconCalendar";
import IconClock from "@/components/icons/IconClock";

export default function QuestionHeader({ question }: any) {
  const [createdAtDate, setCreatedAtDate] = useState(question.created_at);
  const [createdAtTime, setCreatedAtTime] = useState(question.created_at);

  useEffect(() => {
    setCreatedAtDate(new Date(question.created_at).toLocaleDateString());
    setCreatedAtTime(new Date(question.created_at).toLocaleTimeString());
  }, [question.created_at]);

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-4xl text-snow-2 mb-2">
        {question.title}
      </h3>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-sm text-snow-0">
            <IconCalendar /> {createdAtDate}
          </span>
          <span className="flex items-center gap-2 text-sm text-snow-0">
            <IconClock /> {createdAtTime}
          </span>
          <QuestionVotes question={question} />
        </div>
      </div>
    </div>
  );
}
