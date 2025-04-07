import { sortableContainer } from "react-sortable-hoc";

export const SortableTable = sortableContainer(({ children, styleClass }) => {
  return <table className={styleClass}>{children}</table>;
});
