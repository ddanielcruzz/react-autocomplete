import type { User } from "../../App";
import { TextHighlighter } from "../TextHighlighter";
import styles from "./Autcomplete.module.css";

type AutocompleteProps = {
  filteredUsers: User[];
  search: string;
  selectedOptionIndex: number;
  setInput: (name: string) => void;
};

const mergeClassName = (arr: unknown[]) => arr.join(" ");

export const Autocomplete = ({
  filteredUsers,
  search,
  selectedOptionIndex,
  setInput,
}: AutocompleteProps) => {
  return (
    <ul className={styles.list} tabIndex={1}>
      {filteredUsers.map((user, index) => {
        const isSelectedIndex = index === selectedOptionIndex;
        return (
          <li
            className={mergeClassName([
              isSelectedIndex && styles["selected-option"],
            ])}
            key={user.id}
            onClick={() => setInput(user.name)}
          >
            <TextHighlighter text={user.name} search={search} />
          </li>
        );
      })}
    </ul>
  );
};
