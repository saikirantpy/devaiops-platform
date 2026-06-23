"use client";

import { useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import CopilotAnswer from "@/components/dashboard/CopilotAnswer";

import { askCopilot } from "@/services/copilot";

export default function AICopilotPage() {

  const [question, setQuestion] =

    useState("");

  const [answer, setAnswer] =

    useState("");

  const [loading, setLoading] =

    useState(false);

  async function handleAsk() {

    if (!question.trim()) {

      return;

    }

    setLoading(true);

    try {

      const data =

        await askCopilot(

          question

        );

      setAnswer(

        data.answer

      );

    } catch (error) {

      console.error(error);

      setAnswer(

        "Unable to contact AI Copilot."

      );

    }

    setLoading(false);

  }

  return (

    <div className="space-y-8">

      <PageHeader

        title="AI Copilot"

        subtitle="Ask DevAIOps anything"

      />

      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-6">

        <textarea

          value={question}

          onChange={(event) =>

            setQuestion(

              event.target.value

            )

          }

          placeholder="Ask a question..."

          rows={4}

          className="
            w-full

            border

            rounded-lg

            p-4
          "

        />

        <button

          onClick={handleAsk}

          className="
            px-6

            py-3

            rounded-lg

            bg-blue-600

            text-white

            hover:bg-blue-700
          "

        >

          {

            loading

            ? "Thinking..."

            : "Ask"

          }

        </button>

      </div>

      <div className="border rounded-xl p-6 bg-white shadow-sm">

        <h2 className="text-lg font-semibold mb-4">

          Example Questions

        </h2>

        <div className="space-y-2 text-gray-600">

          <p>

            Why is my application unhealthy?

          </p>

          <p>

            What should I fix first?

          </p>

          <p>

            Give me a cluster summary.

          </p>

        </div>

      </div>

      <CopilotAnswer

        answer={answer}

      />

    </div>

  );

}