import Footer from "@/components/modules/Home/Footer";
import PublicNavbar from "@/components/shared/PublicNavbar";

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
