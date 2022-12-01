import React, { useState, useRef, useEffect } from "react";
import styles from "../Select.module.css";

export type OptionsType = {
  label: string;
  value: string | number;
};
type MultipleSelect = {
  value: OptionsType[];
  multiple: true;
  onchange: (op: OptionsType[]) => void;
};

type SingleSelectType = {
  multiple?: false;
  value: OptionsType | undefined;
  onchange: (op: OptionsType | undefined) => void;
};

type SelectProps = {
  options: OptionsType[];
} & (SingleSelectType | MultipleSelect);

const Select: React.FC<SelectProps> = ({
  options,
  onchange,
  value,
  multiple,
}) => {
  const [IsOpen, setIsOpen] = useState(false);
  const [HighLighdedIndex, setHighLighdedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptions = function (e: React.MouseEvent) {
    e.stopPropagation();
    multiple ? onchange([]) : onchange(undefined);
  };

  const removeElement = (e: React.MouseEvent, op: OptionsType) => {
    e.stopPropagation();
    multiple && onchange(value.filter((v) => v.value !== op.value));
  };

  const handleChangevalue = function (op: OptionsType) {
    if (multiple) {
      if (value.filter((v) => v.value === op.value).length)
        onchange(value.filter((v) => v.value !== op.value));
      else onchange([...value, op]);
    } else onchange(op);
  };
  // to handle keybord accessibility
  useEffect(
    function () {
      const handler = (e: KeyboardEvent) => {
        if (e.target != containerRef.current) return;
        switch (e.code) {
          case "Space":
          case "Enter":
            setIsOpen((prev) => !prev);
            console.log(IsOpen);
            break;
          case "ArrowUp":
            console.log(e.code);
            if (IsOpen)
              setHighLighdedIndex((prev) =>
                prev > 0 ? prev - 1 : options.length - 1
              );
            break;
          case "ArrowDown":
            if (IsOpen)
              setHighLighdedIndex((prev) =>
                prev < options.length - 1 ? prev + 1 : 0
              );
            break;
          case "Escape":
            setIsOpen(false);
            break;
        }
      };
      containerRef.current?.addEventListener("keydown", handler);

      return () =>
        containerRef.current?.removeEventListener("keydown", handler);
    },
    [IsOpen]
  );

  return (
    <div
      onBlur={() => IsOpen && setIsOpen((prev) => !prev)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
      ref={containerRef}
    >
      <div className={styles.values}>
        {multiple ? (
          value.map((op, ind) => (
            <div
              key={ind}
              onClick={(e) => removeElement(e, op)}
              className={styles.value}
            >
              <span>{op.label}</span>
              <button className={styles.times}>&times;</button>
            </div>
          ))
        ) : (
          <span>{value?.label}</span>
        )}
      </div>
      <button onClick={clearOptions} className={styles.times}>
        &times;
      </button>
      <span className={styles.caret} />
      <button className={styles.select} />

      <ul
        className={`${styles.options}
         ${!IsOpen ? styles.show : null}
			`}
      >
        {options.map((op, ind) => (
          <li
            onClick={() => handleChangevalue(op)}
            className={`${styles.option}  ${
              !multiple
                ? value?.value == op.value && styles.hihgligh
                : value.some((p) => p.value == op.value) && styles.hihgligh
            } 
            ${ind == HighLighdedIndex && multiple && styles.hihgligh}
            `}
            key={op.value}
          >
            {op.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
