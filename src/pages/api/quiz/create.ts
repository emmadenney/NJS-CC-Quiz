import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

interface CreateQuiz {
  title: string;
  question1: { question: string; answer: boolean };
  question2: { question: string; answer: boolean };
  question3: { question: string; answer: boolean };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { title, question1, question2, question3 } = req.body as CreateQuiz;
    const newQuiz = await prisma.quizzes.create({
      data: {
        title,
      },
    });

    const questions = [question1, question2, question3];

    for (const questionKey in questions) {
      const question = questions[questionKey];
      const newQuestion = await prisma.questions.create({
        data: {
          question: question.question,
          answer: question.answer,
          quiz_id: newQuiz.quiz_id,
          quiz_title: newQuiz.title,
        },
      });
    }

    res.status(201).json(newQuiz);
  }
}
