import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import QuestionHeader from "@/components/questions/QuestionShow/QuestionHeader";
import QuestionFooter from "@/components/questions/QuestionShow/QuestionFooter";

export default function QuestionsShow({ question }: any) {
  const [contentMarkdown, setContentMarkdown] = useState("");

  useEffect(() => {
    const processMarkdown = async () => {
      const processedContent = await remark()
        .use(html)
        .process(question.body);
      setContentMarkdown(processedContent.toString());
    };

    processMarkdown();
  }, [question.body]);

  return (
    <article className="relative mb-6">
      <div className="">
        <div className="">
          <QuestionHeader question={question} />
          <div className="">
            <div
              className="markdown text-snow-2 mb-4"
              dangerouslySetInnerHTML={{ __html: contentMarkdown }}
            />
          </div>
          <QuestionFooter question={question} />
        </div>
      </div>
    </article>
  );
}
