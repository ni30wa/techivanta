import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminMessages = lazy(() => import("./components/AdminMessages"));
const AdminProjects = lazy(() => import("./components/AdminProjects"));
const EditProject = lazy(() => import("./components/EditProject"));
const AdminBlog = lazy(() => import("./components/AdminBlog"));
const AdminServiceManager = lazy(() => import("./components/AdminService"));
const AdminCustomerView = lazy(() => import("./components/AdminCustomerView"));
const AdminJob = lazy(() => import("./components/AdminJob"));
const Jobs = lazy(() => import("./components/AdminCareers"));
const Partners = lazy(() => import("./components/AdminOfficialPartner"));
const Employee = lazy(() => import("./components/AdminEmployeeForm"));
const Journey = lazy(() => import("./components/AdminJourney"));
const Certificates = lazy(() => import("./components/AdminDocuments"));
const Gallery = lazy(() => import("./components/AdminGallery"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Hero from "./components/AdminHome";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import ServicePage from "./components/SevicePage";
import BlogPage from "./components/BlogPage";
import CareerPage from "./components/CareerPage";
import PrivacyPlicy from "./components/PrivacyPolicy";
import Terms from "./components/TermsAndConditions";
import Support from "./components/Support";
import FAQs from "./components/FAQs";

// Footer Services
import OurServicePage from "./components/OurServicePage";
import WebDevelopment from "./components/WebDevelopment";
import CloudSolutions from "./components/CloudSolutions";
import MobileAppDevelopment from "./components/MobileAppDevelopment";
import ITConsulting from "./components/ITConsulting";
import GalleryView from "./components/Gallery";

import Loading from "./components/Loading";
import VerifyDocument from "./components/VerifyDocument";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Dashboard Routes with Sidebar */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Hero />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="blogs" element={<AdminBlog />} />
              <Route path="customer" element={<AdminCustomerView />} />
              <Route path="job" element={<AdminJob />} />
              <Route path="career" element={<Jobs />} />
              <Route path="service" element={<AdminServiceManager />} />
              <Route path="partner" element={<Partners />} />
              <Route path="employee" element={<Employee />} />
              <Route path="journey" element={<Journey />} />
              <Route path="certificate" element={<Certificates />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="project/edit/:id" element={<EditProject />} />
            </Route>

            {/* Footer-linked Company Pages */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareerPage />} />

            {/* Quick Links */}
            <Route path="/privacy-policy" element={<PrivacyPlicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faqs" element={<FAQs />} />

            {/* Footer Services */}
            <Route path="/ourservice" element={<OurServicePage />} />
            <Route
              path="/services/web-development"
              element={<WebDevelopment />}
            />
            <Route
              path="/services/cloud-solutions"
              element={<CloudSolutions />}
            />
            <Route
              path="/services/mobile-apps"
              element={<MobileAppDevelopment />}
            />
            <Route path="/services/consulting" element={<ITConsulting />} />
            <Route path="/gallery" element={<GalleryView />} />

            {/* Document Verification */}
            <Route path="/verify" element={<VerifyDocument />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
