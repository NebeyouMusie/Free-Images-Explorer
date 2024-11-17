import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryDropdownProps {
  onSelect: (category: string) => void;
}

const categories = [
  "Nature",
  "City",
  "Animals",
  "Food",
  "Architecture",
  "Travel",
  "Technology",
  "People",
];

export function CategoryDropdown({ onSelect }: CategoryDropdownProps) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category.toLowerCase()}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}