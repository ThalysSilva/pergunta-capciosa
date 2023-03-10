import { useEffect, useRef, useState } from "react";

export function useTrick() {
  const [originalLeftPosition, setOriginalLeftPosition] = useState(0);
  const [originalTopPosition, setOriginalTopPosition] = useState(0);
  const [youAreDumb, setYouAreDumb] = useState(false);
  const questionBoxRef = useRef(null);
  const noAnswerRef = useRef(null);

  useEffect(() => {
    if (noAnswerRef.current === null) return;
    const noAnswer = noAnswerRef.current as HTMLElement;
    const { top: originalTopPosition, left: originalLeftPosition } =
      noAnswer.getBoundingClientRect();

    setOriginalLeftPosition(originalLeftPosition);
    setOriginalTopPosition(originalTopPosition);
  }, [noAnswerRef]);

  function switchPosition() {
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
    switchPosition,
    handleClick,
    questionBoxRef,
    youAreDumb,
  };
}
