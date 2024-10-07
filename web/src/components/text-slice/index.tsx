/** @format */

import { TextSliceIProps } from "@shtcut/types/types";


function TextSlice({ text, wordLimit }: TextSliceIProps) {
  if (typeof text !== "string" || !text) {
    return null;
  }
  const words = text.split(" ");

  if (words.length > wordLimit) {
    const slicedText = words.slice(0, wordLimit).join(" ");
    return <>{slicedText}...</>;
  }

  return <>{text}</>;
}
export default TextSlice;
