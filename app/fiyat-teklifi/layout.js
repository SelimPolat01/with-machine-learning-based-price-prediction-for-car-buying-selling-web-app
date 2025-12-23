import Header from "@/app/components/Header";

export const metadata = {
  title: "Fiyat Teklifi",
  description: "Fiyat Teklifi.",
};

export default function PriceOfferLayout({ children }) {
  return (
    <>
      <Header className="blackColorLink" />
      <main className="rootMain">{children}</main>
    </>
  );
}
