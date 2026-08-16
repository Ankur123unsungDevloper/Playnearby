import { SearchQueryProvider } from "@/hooks/use-search-query";
import Navbar from "./navbar/page";
import Footer from "./footer/page";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchQueryProvider>
      <div className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SearchQueryProvider>
  );
}
