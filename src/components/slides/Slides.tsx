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
      "Lorem ipsum dolor sit amet.",
  },
  {
    title: "level 2",
    complexity: 3,
    phrase:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "level 3",
    complexity: 2,
    phrase:
      "Lorem ipsum dolor sit amet.",
  },
  {
    title: "level 4",
    complexity: 2,
    phrase:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "level 5",
    complexity: 2,
    phrase:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eum enim voluptatibus.",
  },
  {
    title: "level 6",
    complexity: 1,
    phrase:
      "Lorem ipsum dolor sit amet.",
  },
  {
    title: "level 7",
    complexity: 1,
    phrase:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "level 8",
    complexity: 1,
    phrase:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eum enim voluptatibus.",
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
