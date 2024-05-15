import SelectitemComponent from "@components/select-item/SelectItem";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { quizData } from "@utils/quiz-data";
import { SelectItemProps } from "@utils/types";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Mubvunzo = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<SelectItemProps>();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className=" grid md:grid-cols-2 col-span-1 min-h-screen">
      <div className="col-span-1 bg-primary-super_light md:p-8 p-4 flex flex-col">
        <Link
          href={"/games"}
          className="flex items-center space-x-2 text-primary-original text-xs font-semibold"
        >
          <ArrowLeftIcon height={16} width={16} />
          <p>Back to games</p>
        </Link>
        <div className="flex-1">
          <div className="grid items-center flex-col space-y-2 h-full max-w-3xl ml-auto content-center">
            <div className="self-center text-3xl font-semibold pb-4 text-primary-light">
              {currentQuestion < quizData.length && (
                <p>question {currentQuestion + 1}/9</p>
              )}
            </div>
            <p className="self-center text-3xl font-extrabold text-primary-original">
              {currentQuestion < quizData.length ? (
                <p>{quizData[currentQuestion].question}</p>
              ) : (
                <p>Quiz Completed</p>
              )}

              {/* Chikafu chefodya yemasvikiro chinonzii? */}
            </p>
            <p className="self-center text-xl font-bold text-primary-light">
              Select one answer
            </p>
          </div>
        </div>
        <div className="md:flex hidden items-center space-x-2 text-xs font-semibold">
          <p className="self-center text-3xl font-semibold text-primary-original">
            Mubvunzo
          </p>
        </div>
      </div>
      {/* quiz answers */}
      <div className="flex-1 h-full flex flex-col px-4 py-16">
        {currentQuestion < quizData.length ? (
          <>
            <div className="flex flex-1 flex-col gap-8 max-w-xl content-center justify-center mx-auto w-full ">
              {quizData[currentQuestion].options.map((item: any) => (
                <SelectitemComponent
                  subCategory={{ name: item, _id: item, slug: item }}
                  selectedSubCategory={selectedCategory}
                  onClick={() => handleOptionSelect(item)}
                  setSelectedSubCategory={setSelectedCategory}
                />
              ))}
            </div>
            <div className="flex self-center flex-row items-center space-x-4">
              <button className="bg-primary-original text-white px-4 py-2 rounded-full">
                Previous
              </button>
              <button
                onClick={handleSubmit}
                className="flex bg-primary-super_dark text-white px-4 py-2 rounded-full"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col gap-8 max-w-xl content-center justify-center mx-auto w-full ">
            <h2 className="text-3xl font-extrabold text-primary-original">
              Quiz Completed!
            </h2>
            <p className="text-3xl font-semibold pb-4 text-primary-light">
              Your score is {score} out of {quizData.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mubvunzo;
