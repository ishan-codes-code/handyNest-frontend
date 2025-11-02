import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import classNames from "classnames";
import { useState } from "react";

export default function ComboboxSelect({
  T,
  selected,
  setSelected,
  opts,
  placeholder,
}) {
  // Filter options based on query

  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? opts
      : opts.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full h-auto">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            id={placeholder || "comboInput"}
            placeholder={placeholder || "Select an option"}
            className={classNames(
              "w-full rounded-lg border-2 py-2 pr-8 pl-3",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2",
              T.dataFocusOutline
            )}
            displayValue={(opt) => opt} // display the string directly
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDown className="size-4 text-slate-600 group-data-[hover]:text-gray-800 group-data-[active]:rotate-180 transition-transform" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={classNames(
            "w-[--input-width] mt-1 rounded-xl border border-slate-400 p-1 [--anchor-gap:--spacing(1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 bg-gradient-to-tr",
            T.workersBg
          )}
        >
          {filteredOptions.map((opt, index) => (
            <ComboboxOption
              key={index}
              value={opt}
              className={classNames(
                "group flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 select-none",
                T.dataFocusBg,
                T.hoverColor
              )}
            >
              <Check className="invisible size-4 group-data-[selected]:visible" />
              <div className="text-sm/6">{opt}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
