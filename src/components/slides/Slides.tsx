import { useState } from "react";
import { SlidesControls } from "./SlidesControls";
import { SlidesItem } from "./SlidesItem";

export type SlideItem = {
  title: string;
  complexity: 1 | 2 | 3;
  phrase: string;
};

const slideList = [
  {
    title: "level 1",
    complexity: 3,
    phrase:
      "The cat jumped on the bed and purred.",
  },
  {
    title: "level 2",
    complexity: 3,
    phrase:
      "A sudden downpour caught us off guard during the picnic, soaking everything.",
  },
  {
    title: "level 3",
    complexity: 2,
    phrase:
      "In the heart of the bustling city, a hidden oasis of tranquility awaited, beckoning weary souls.",
  },
  {
    title: "level 4",
    complexity: 2,
    phrase:
      "The quaint, dimly lit antique bookstore smelled of old leather-bound books and held forgotten memories within its dusty shelves.",
  },
  {
    title: "level 5",
    complexity: 2,
    phrase:
      "With each determined stride, the marathon runner pushed past her physical and mental limits, inching closer to the finish line.",
  },
  {
    title: "level 6",
    complexity: 1,
    phrase:
      "The intricate tapestry of life weaves a complex, beautiful pattern, intertwining the threads of joy, sorrow, and love.",
  },
  {
    title: "level 7",
    complexity: 1,
    phrase:
      "Amidst the chaos and despair, a glimmer of hope ignited their spirits, fueling their resilience and resolve.",
  },
  {
    title: "level 8",
    complexity: 1,
    phrase:
      "Beneath the starry sky, they danced to a silent melody, lost in the magic of the moment.",
  },
] as SlideItem[];

export const Select: React.FC = () => {
  const [slides, setSlides] = useState<number>(0);
  return (
    <section className="slides">
      <ul className="slides__list">
        {slideList.map((lvl,index)=>{
          return <SlidesItem key={index} {...lvl} index={index} current={slides} max={slideList.length-1}/>
        })}
      </ul>
      <SlidesControls maxSlides={slideList.length} setSlides={setSlides} />
    </section>
  );
};
