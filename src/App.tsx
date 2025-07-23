import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ApplicantListSection,
  Footer,
  FormSection,
  GallerySection,
  GrowthPotentialSection,
  Header,
  HeroSection,
  ProjectOverviewSection,
  ROIAnalysisSection,
  TourInfraMapSection,
  TouristStatsSection,
  VideoSection,
  WhyInvestSection,
} from "./components";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <ROIAnalysisSection />
        <GallerySection />
        <TouristStatsSection />
        <TourInfraMapSection />
        <WhyInvestSection />
        <GrowthPotentialSection />
        <FormSection />
        <ApplicantListSection />
        <ProjectOverviewSection />
      </main>
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
