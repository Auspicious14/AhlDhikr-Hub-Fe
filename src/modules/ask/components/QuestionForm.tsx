import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/Button';
import { Send, Eye } from 'lucide-react';
import { useRouter } from 'next/router';

const QuestionSchema = Yup.object().shape({
  question: Yup.string()
    .min(15, 'Your question is too short. Please provide more detail.')
    .required('Please enter your question.'),
});

const QuestionForm = () => {
  const [preview, setPreview] = useState('');
  const router = useRouter();

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-8">
      <Formik
        initialValues={{ question: '' }}
        validationSchema={QuestionSchema}
        onSubmit={(values, { setSubmitting }) => {
          // In a real app, this would submit to the backend.
          // For now, we'll just redirect to a mocked answer page.
          console.log('Submitted question:', values.question);
          setSubmitting(false);
          router.push('/ask/what-is-the-ruling-on-fasting-on-the-day-of-ashura');
        }}
        validateOnChange
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="question" className="block text-lg font-medium text-gold-500 mb-2">
                Your Question
              </label>
              <Field
                as="textarea"
                id="question"
                name="question"
                rows="6"
                className="w-full bg-brand-dark/50 border border-emerald-500/30 rounded-button p-4 text-beige-100 placeholder-beige-100/50 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300"
                placeholder="Please be detailed and clear in your question. For example: 'What is the Islamic ruling on...?'"
                onKeyUp={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setPreview(e.target.value);
                }}
              />
              <ErrorMessage name="question" component="div" className="text-red-400 mt-2 text-sm" />
            </div>

            {preview && (
              <div className="mb-8 p-6 border border-emerald-500/20 rounded-lg bg-brand-dark/40">
                <h3 className="flex items-center text-lg font-semibold text-gold-500 mb-3">
                  <Eye className="mr-2 h-5 w-5" />
                  Live Preview
                </h3>
                <p className="text-beige-100/80 whitespace-pre-wrap">{preview}</p>
              </div>
            )}

            <div className="text-right">
              <Button type="submit" size="lg" disabled={isSubmitting || !isValid || !dirty}>
                <Send className="mr-2 h-5 w-5" />
                Submit Question
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuestionForm;
