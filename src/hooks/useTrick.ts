import { useEffect, useRef, useState } from "react";

export function useTrick() {
  const [youAreDumb, setYouAreDumb] = useState(false);
  const [originalLeftPosition, setOriginalLeftPosition] = useState(0);
  const [originalTopPosition, setOriginalTopPosition] = useState(0);
  const noAnswerRef = useRef(null);
  const questionBoxRef = useRef(null);


  useEffect(() => {
    if (noAnswerRef.current === null) return;
    const noAnswer = noAnswerRef.current as HTMLElement;
    const { top: originalTopPosition, left: originalLeftPosition } =
      noAnswer.getBoundingClientRect();

    setOriginalLeftPosition(originalLeftPosition);
    setOriginalTopPosition(originalTopPosition);
  }, [noAnswerRef]);

  function handleHover() {
    const body = document.querySelector("body");
    if (!body) return;

    if (noAnswerRef.current === null) return;
    const noAnswer = noAnswerRef.current as HTMLElement;
    if (questionBoxRef.current === null) return;

    const { clientWidth: bodyWidth, clientHeight: bodyHeight } = document.body;

    const randomLeftPosition = Math.floor(
      Math.random() * (bodyWidth - noAnswer.clientWidth)
    );
    const randomTopPosition = Math.floor(
      Math.random() * (bodyHeight - noAnswer.clientHeight)
    );

    const newLeftPosition = -originalLeftPosition + randomLeftPosition;
    const newTopPosition = -originalTopPosition + randomTopPosition;

    noAnswer.style.left = `${newLeftPosition}px`;
    noAnswer.style.top = `${newTopPosition}px`;
  }

  function handleClick() {
    setYouAreDumb(true);
  }

  return {
    noAnswerRef,
    handleHover,
    handleClick,
    questionBoxRef,
    youAreDumb,
  };
}
