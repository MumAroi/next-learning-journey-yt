"use client"
import React from 'react'
import { Chapter, Course, Unit } from "@prisma/client";
import ChapterCard, { ChapterCardHandler } from './ChapterCard';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from './ui/separator';

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};


const ConfirmChapters = ({course}: Props) => {
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });

  return (
    <div className="w-full mt-4">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
          <h2 className="text-sm uppercase text-secondary-foreground/60">
            Unit {unitIndex + 1}
          </h2>
          <h3 className="text-2xl font-bold">{unit.name}</h3>
          <div className="mt-3">
          {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <ChapterCard
                  // completedChapters={completedChapters}
                  // setCompletedChapters={setCompletedChapters}
                  ref={chapterRefs[chapter.id]}
                  key={chapter.id}
                  chapter={chapter}
                  chapterIndex={chapterIndex}
                />
              )
          })}
          </div>
        </div>
        )
      })}
      <div className="flex items-center justify-center mt-4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link
            href="/create"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4} />
            Back
          </Link>
        </div>
        <Button
          type="button"
          className="ml-4 font-semibold"
          onClick={() => {
            Object.values(chapterRefs).forEach((ref) => {
              ref.current?.triggerLoad();
            });
          }}
        >
          Generate
          <ChevronRight className="w-4 h-4 ml-2" strokeWidth={4} />
        </Button>
        <Separator className="flex-[1]" />
      </div>
    </div>
  )
}

export default ConfirmChapters