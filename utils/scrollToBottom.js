import { animateScroll } from "react-scroll";

export const scrollToBottom = (id) => {
  animateScroll.scrollToBottom({
    containerId: id,
    duration: 0,
  });
};

export const scrollToBottomAnimates = (id) => {
  console.log(id);
  animateScroll.scrollToBottom({
    containerId: id,
    duration: 250,
  });
};
