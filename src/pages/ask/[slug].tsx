import AnswerPage from '@/modules/answer/page';
import { answers, Answer } from '@/lib/mock-data';
import { GetServerSideProps } from 'next';

interface AnswerPageProps {
  answer: Answer;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};
  const answer = answers.find(a => a.slug === slug);

  if (!answer) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      answer,
    },
  };
};

const DynamicAnswerPage = ({ answer }: AnswerPageProps) => {
    return <AnswerPage answer={answer} />;
};

export default DynamicAnswerPage;
