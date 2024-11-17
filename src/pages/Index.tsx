import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { CategoryDropdown } from "@/components/CategoryDropdown";
import { ImageGrid } from "@/components/ImageGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { searchPhotos, getCuratedPhotos } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["photos", searchQuery],
    queryFn: () =>
      searchQuery ? searchPhotos(searchQuery) : getCuratedPhotos(),
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  // Handle errors outside of the query configuration
  if (data === undefined) {
    toast({
      title: "Error",
      description: "Failed to fetch images. Please try again later.",
      variant: "destructive",
    });
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSearchQuery(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">Gallery</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
          <SearchBar onSearch={handleSearch} />
          <CategoryDropdown onSelect={handleCategorySelect} />
        </div>

        <ImageGrid
          photos={data?.photos || []}
          isLoading={isLoading}
        />
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with{" "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Pexels API
            </a>
            . Free to use.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;