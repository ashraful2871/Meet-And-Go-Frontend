import Footer from "@/components/modules/Home/Footer";
import PublicNavbar from "@/components/shared/PublicNavbar";
export const dynamic = "force-dynamic";
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      {children}
      <Footer />
    </>
  );
};

export default CommonLayout;
