import { prisma } from "../../../prisma";

export async function getAllQuestions() {
  const questions = await prisma.questions.findMany();
  return questions;
}

export async function getAllQuizzes() {
  const quizzes = await prisma.quizzes.findMany();
  return quizzes;
}
