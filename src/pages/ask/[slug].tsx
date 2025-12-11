import AnswerPage from "@/modules/answer/page";
import { Answer } from "@/modules/answer/model";
import { GetServerSideProps } from "next";

interface AnswerPageProps {
  answer: Answer;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:12000";
    // Ensure we hit the /api/ask/:slug endpoint.
    // User added /api to base URL in apiClient, so backend likely expects it.
    // Backend router is mounted at /api.
    const res = await fetch(`${apiUrl}/api/ask/${slug}`);

    if (!res.ok) {
      if (res.status === 404) {
        return { notFound: true };
      }
      throw new Error(`Failed to fetch answer: ${res.statusText}`);
    }

    const answer = await res.json();

    return {
      props: {
        answer,
      },
    };
  } catch (error) {
    console.error("Error fetching answer:", error);
    return {
      notFound: true,
    };
  }
};

const DynamicAnswerPage = ({ answer }: AnswerPageProps) => {
  return <AnswerPage answer={answer} />;
};

export default DynamicAnswerPage;
