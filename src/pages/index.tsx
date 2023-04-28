import Head from "next/head";
import { prisma } from "../prisma";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {
  const quizzes = await prisma.quizzes.findMany();
  return { props: { quizzes } };
};

interface HomeProps {
  quizzes: any[];
}

export default function Home(props: HomeProps) {
  const { quizzes } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Quiz Machine</title>
      </Head>
      <main>
        <h1 className="text-5xl text-black font-semibold text-center p-8">
          Let's get quizzy!
        </h1>
        <div className="flex flex-col items-center justify-center max-w-[1240px]">
          <ul className="flex flex-wrap flex-row items-center justify-center">
            {quizzes.map((quiz) => (
              <Link key={quiz.quiz_id} href={`/quiz/${quiz.quiz_id}`}>
                <li className="p-4 m-4 bg-gray-300 hover:bg-gray-500 rounded-lg">
                  {quiz.title}
                </li>
              </Link>
            ))}
          </ul>
          <Link href="/create">
            <button className="p-4 m-4 mt-10 bg-cyan-800 text-white hover:bg-cyan-600 rounded-lg focus:outline-none focus:ring focus:ring-cyan-500">
              Create quiz
            </button>
          </Link>
          <button
            onClick={() => {
              router.reload();
            }}
            className="p-3 m-4 mt-10 text-sm bg-cyan-700 text-white hover:bg-cyan-600 rounded-lg focus:outline-none focus:ring focus:ring-cyan-400"
          >
            Refresh quiz list
          </button>
        </div>
      </main>
    </>
  );
}
