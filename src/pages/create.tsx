import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface CreateQuiz {
  title: string;
  question1: { question: string; answer: boolean };
  question2: { question: string; answer: boolean };
  question3: { question: string; answer: boolean };
}

export default function CreateQuiz() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [question1, setQuestion1] = useState({ question: "", answer: true });
  const [question2, setQuestion2] = useState({ question: "", answer: true });
  const [question3, setQuestion3] = useState({ question: "", answer: true });

  const createQuizMutation = useMutation((quizData: CreateQuiz) => {
    return fetch("/api/quiz/create", {
      method: "POST",
      body: JSON.stringify(quizData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  });

  const handleCreateQuiz = () => {
    createQuizMutation.mutate({ title, question1, question2, question3 });
  };

  return (
    <section>
      <h2 className="p-6 text-4xl text-center">Create a new quiz</h2>
      <form className="flex flex-col items-center justify-center">
        <label htmlFor="create-title">Give your quiz a name:</label>
        <input
          className="border-2 border-cyan-900 mx-2 rounded-lg pl-2 pr-2 w-[60%] mb-4"
          type="text"
          id="create-title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <br></br>
        <label htmlFor="question1">Question 1:</label>
        <input
          className="border-2 border-cyan-900 mx-2 rounded-lg pl-2 pr-2 w-[60%]"
          id="question1"
          value={question1.question}
          onChange={(event) => {
            setQuestion1({
              question: event.target.value,
              answer: question1.answer,
            });
          }}
        ></input>
        <label className="mt-4 p-2">Answer:</label>
        <div>
          <button
            type="button"
            className="p-2 m-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-200"
            onClick={() => {
              setQuestion1({ question: question1.question, answer: true });
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="p-2 m-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-200"
            onClick={() => {
              setQuestion1({ question: question1.question, answer: false });
            }}
          >
            No
          </button>
        </div>
        <br></br>
        <label htmlFor="question2">Question 2:</label>
        <input
          className="border-2 border-cyan-900 mx-2 rounded-lg pl-2 pr-2 w-[60%]"
          id="question2"
          value={question2.question}
          onChange={(event) => {
            setQuestion2({
              question: event.target.value,
              answer: question2.answer,
            });
          }}
        ></input>
        <label className="mt-4 p-2">Answer:</label>
        <div>
          <button
            type="button"
            className="p-2 m-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-200"
            onClick={() => {
              setQuestion2({ question: question2.question, answer: true });
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="p-2 m-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-200"
            onClick={() => {
              setQuestion2({ question: question2.question, answer: false });
            }}
          >
            No
          </button>
        </div>
        <br></br>
        <label htmlFor="question3">Question 3:</label>
        <input
          className="border-2 border-cyan-900 mx-2 rounded-lg pl-2 pr-2 w-[60%]"
          id="question3"
          value={question3.question}
          onChange={(event) => {
            setQuestion3({
              question: event.target.value,
              answer: question3.answer,
            });
          }}
        ></input>
        <label className="mt-4 p-2">Answer:</label>
        <div>
          <button
            type="button"
            className="p-2 m-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-200"
            onClick={() => {
              setQuestion3({ question: question3.question, answer: true });
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="p-2 m-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-200"
            onClick={() => {
              setQuestion3({ question: question3.question, answer: false });
            }}
          >
            No
          </button>
        </div>
        <Link href="/">
          <button
            type="button"
            className="bg-cyan-900 text-white hover:bg-cyan-800 p-3 mt-6 rounded-lg focus:outline-none focus:ring focus:ring-cyan-600"
            onClick={handleCreateQuiz}
          >
            Create quiz!
          </button>
        </Link>
        <Link href="/">
          <button
            type="button"
            className="p-3 m-4 mt-6 text-sm bg-cyan-700 text-white hover:bg-cyan-600 rounded-lg focus:outline-none focus:ring focus:ring-cyan-400"
          >
            Go back
          </button>
        </Link>
      </form>
    </section>
  );
}
