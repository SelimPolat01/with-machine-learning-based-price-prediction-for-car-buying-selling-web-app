import Header from "@/app/components/Header";

export const metadata = {
  title: "Favori İlanlar",
  description: "Favori İlanlar.",
};

export default function FavoriteAdvertsLayout({ children }) {
  return (
    <>
      <Header className="blackColorLink" />
      <main className="rootMain">{children}</main>
    </>
  );
}
