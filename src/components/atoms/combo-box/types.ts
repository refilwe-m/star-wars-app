import type { Option } from "@/common";

export type ComboBoxProps = {
  value: Option | null;
  onChange: (value: Option | null) => void;
  options: Option[];
  setQuery: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
  error?: string | null;
};
