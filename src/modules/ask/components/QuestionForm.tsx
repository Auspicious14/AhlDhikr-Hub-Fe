import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { Send, Eye } from "lucide-react";
import { useAsk } from "../context";
import ThinkingIndicator from "./ThinkingIndicator";
import StreamingAnswer from "./StreamingAnswer";

const QuestionSchema = Yup.object().shape({
  question: Yup.string()
    .min(15, "Your question is too short. Please provide more detail.")
    .required("Please enter your question."),
});

const QuestionForm = () => {
  const [preview, setPreview] = useState("");
  const {
    askQuestionStream,
    isThinking,
    isStreaming,
    sources,
    answer,
    error,
    slug,
    reset,
  } = useAsk();

  const handleSubmit = async (
    values: { question: string },
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await askQuestionStream(values.question);
      setPreview("");
    } catch (err) {
      console.error("Error submitting question:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewQuestion = () => {
    reset();
    setPreview("");
  };

  const isProcessing = isThinking || isStreaming;

  return (
    <div className="space-y-6">
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-8">
        <Formik
          initialValues={{ question: "" }}
          validationSchema={QuestionSchema}
          onSubmit={handleSubmit}
          validateOnChange
        >
          {({ isSubmitting, isValid, dirty, resetForm }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="question"
                  className="block text-lg font-medium text-gold-500 mb-2"
                >
                  Your Question
                </label>
                <Field
                  as="textarea"
                  id="question"
                  name="question"
                  rows="6"
                  className="w-full bg-white dark:bg-gray-800 border border-emerald-500/30 rounded-button p-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300"
                  placeholder="Please be detailed and clear in your question. For example: 'What is the Islamic ruling on...?'"
                  onKeyUp={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setPreview(e.target.value);
                  }}
                  disabled={isProcessing}
                />
                <ErrorMessage
                  name="question"
                  component="div"
                  className="text-red-400 mt-2 text-sm"
                />
              </div>

              {preview && !isProcessing && (
                <div className="mb-8 p-6 border border-emerald-500/20 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h3 className="flex items-center text-lg font-semibold text-gold-500 mb-3">
                    <Eye className="mr-2 h-5 w-5" />
                    Live Preview
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {preview}
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-4 text-red-400 p-4 bg-red-500/10 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-3 justify-end">
                {(answer || isProcessing) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      handleNewQuestion();
                      resetForm();
                    }}
                    disabled={isProcessing}
                  >
                    New Question
                  </Button>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !isValid || !dirty || isProcessing}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isProcessing ? "Processing..." : "Submit Question"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {isThinking && (
        <ThinkingIndicator message="Searching for relevant sources..." />
      )}

      <StreamingAnswer
        answer={answer}
        sources={sources}
        isStreaming={isStreaming}
        slug={slug}
      />
    </div>
  );
};

export default QuestionForm;
