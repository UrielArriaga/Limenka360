import { sortableElement } from "react-sortable-hoc";

export const SortableRow = sortableElement(({ children, styleClass }) => <td className={styleClass}>{children}</td>);