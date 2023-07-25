import React, { useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";

import { Autocomplete } from "./components";

export type User = {
  name: string;
  id: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [autocomplete, setAutocomplete] = useState({
    value: "",
    show: false,
    selectedOptionIndex: 0,
    loading: false,
  });

  const filteredUsers = useMemo(() => {
    return autocomplete.value === ""
      ? []
      : users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(autocomplete.value.toLowerCase()) >
            -1
        );
  }, [users, autocomplete.value]);

  const showAutocomplete = autocomplete.show && filteredUsers.length > 0;

  const fetchUsers = async () => {
    if (users.length === 0) {
      setAutocomplete((prev) => ({ ...prev, loading: true }));
      const fetchedUsers = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((res) => {
        setAutocomplete((prev) => ({ ...prev, loading: false }));
        return res.json();
      });

      setUsers(fetchedUsers);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setAutocomplete((prev) => ({
      ...prev,
      selectedOptionIndex: 0,
      show: true,
      value: newSearch,
    }));

    await fetchUsers();
  };

  const setInput = (name: string) =>
    setAutocomplete((prev) => ({
      ...prev,
      selectedOptionIndex: 0,
      show: false,
      value: name,
    }));

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (showAutocomplete) {
        if (e.key === "ArrowDown") {
          setAutocomplete((prev) => ({
            ...prev,
            selectedOptionIndex:
              (prev.selectedOptionIndex + 1) % filteredUsers.length,
          }));
        }
        if (e.key === "ArrowUp") {
          setAutocomplete((prev) => ({
            ...prev,
            selectedOptionIndex:
              (prev.selectedOptionIndex - 1 + filteredUsers.length) %
              filteredUsers.length,
          }));
        }
        if (e.key === "Escape") {
          setAutocomplete((prev) => ({
            ...prev,
            value: "",
            show: false,
            selectedOptionIndex: 0,
          }));
        }
        if (e.key === "Enter") {
          setInput(filteredUsers[autocomplete.selectedOptionIndex].name);
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [filteredUsers, showAutocomplete, autocomplete.selectedOptionIndex]);

  return (
    <main className={styles.app}>
      <section className={styles.container}>
        <input
          tabIndex={0}
          className={styles.input}
          type="text"
          name="search"
          onChange={onChange}
          value={autocomplete.value}
          placeholder="Search name"
        />
        {autocomplete.loading && (
          <article className={styles["info-article"]}>Loading...</article>
        )}
        {showAutocomplete && (
          <Autocomplete
            filteredUsers={filteredUsers}
            search={autocomplete.value}
            selectedOptionIndex={autocomplete.selectedOptionIndex}
            setInput={setInput}
          />
        )}
      </section>
    </main>
  );
}

export default App;
