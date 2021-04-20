import Navbar from "./Navbar";
import AddNote from "./Notes/AddNote";
import Notes from '../components/Notes';

const HomePageComponent = () => (
  <div className="App mt-16 max-w-7xl mx-auto px-2">
    <Navbar />
    <AddNote />
    <Notes />
  </div>
);

export default HomePageComponent;
