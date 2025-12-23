import Header from "@/app/components/Header";

export const metadata = {
  title: "İlanlarım",
  description: "İlanlarım.",
};

export default function MyAdvertsLayout({ children }) {
  return (
    <>
      <Header className="blackColorLink" />
      <main className="rootMain">{children}</main>
    </>
  );
}
