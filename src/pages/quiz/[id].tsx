import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllQuestions, getAllQuizzes } from "../api/quiz";

export const getStaticPaths: GetStaticPaths = async () => {
  const quizzes = await getAllQuizzes();
  const paths = quizzes.map((quiz) => ({
    params: { id: quiz.quiz_id.toString() },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async () => {
  const questions = await getAllQuestions();
  return {
    props: { questions },
    revalidate: 10,
  };
};

interface Questions {
  questions: any[];
}

export default function Quiz(props: Questions) {
  const { questions } = props;
  const router = useRouter();
  const { id } = router.query;

  const questionData = questions.filter((question) => {
    if (question.quiz_id === parseInt(id as string)) {
      return question;
    }
  });

  return (
    <section>
      <h2 className="p-6 text-4xl text-center">{questionData[0].quiz_title}</h2>
      <div className="flex flex-col items-center justify-center">
        <ol>
          {questionData.map((question) => {
            return (
              <li key={question.question_id} className="text-center p-2 m-4">
                <p>{question.question}</p>
              </li>
            );
          })}
        </ol>
        <button
          className="p-3 m-4 mt-10 text-sm bg-cyan-700 text-white hover:bg-cyan-600 rounded-lg focus:outline-none focus:ring focus:ring-cyan-400"
          onClick={() => {
            router.replace("/");
          }}
        >
          Go back
        </button>
      </div>
    </section>
  );
}
