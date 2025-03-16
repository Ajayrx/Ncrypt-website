
export const transitionClasses = {
  enter: "transform transition duration-500 ease-out",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "transform transition duration-300 ease-in",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95",
};

export const slideTransition = {
  enter: "transform transition duration-500 ease-out",
  enterFrom: "opacity-0 translate-y-4",
  enterTo: "opacity-100 translate-y-0",
  leave: "transform transition duration-300 ease-in",
  leaveFrom: "opacity-100 translate-y-0",
  leaveTo: "opacity-0 translate-y-4",
};

export const fadeTransition = {
  enter: "transition duration-300 ease-out",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "transition duration-200 ease-in",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export const animationDelay = (index: number, base = 100): string => {
  return `${base * index}ms`;
};
