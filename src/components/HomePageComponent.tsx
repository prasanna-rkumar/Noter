import Navbar from "./Navbar";
import AddNote from "./Notes/AddNote";
import Notes from "../components/Notes";
import { SearchProvider } from "../context/SearchContext";
import { LayoutProvider } from "../context/LayoutContext";

const HomePageComponent = () => (
  <LayoutProvider>
    <SearchProvider>
      <div className="App mt-16 max-w-7xl mx-auto px-2">
        <Navbar />
        <AddNote />
        <Notes />
      </div>
    </SearchProvider>
  </LayoutProvider>
);

export default HomePageComponent;
