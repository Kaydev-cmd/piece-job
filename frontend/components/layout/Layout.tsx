import Header from "./Header";
import Footer from "./Footer";
import { LayoutProps } from "@/interfaces";

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;