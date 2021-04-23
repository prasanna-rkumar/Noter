import { clamp, distance, Point } from "@popmotion/popcorn";

export interface Position {
  top: number;
  left: number;
  height: number;
  width: number;
}

const buffer = 10;

export const findIndex = (i: number, point: Point, positions: Position[]) => {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  let { y: yOffset } = point;

  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > swapOffset) target = i + 1;

    // If moving up
  } else if (yOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};
