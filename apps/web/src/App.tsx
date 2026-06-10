import { Link, Navigate, Route, Routes } from "react-router-dom";
import { AgentsPage } from "./pages/AgentsPage";
import { DemoPage } from "./pages/DemoPage";
import { EventsPage } from "./pages/EventsPage";
import { LandingPage } from "./pages/LandingPage";
import { MapPage } from "./pages/MapPage";
import { MilitaryPage } from "./pages/MilitaryPage";
import { NationCreationPage } from "./features/nationCreation/NationCreationPage";
import { NationProfilePage } from "./pages/NationProfilePage";
import { NewsPage } from "./pages/NewsPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-nation" element={<NationCreationPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/nation/:id" element={<NationProfilePage />} />
      <Route path="/nation/:id/profile" element={<NationProfilePage />} />
      <Route path="/nation/:id/news" element={<NewsPage />} />
      <Route path="/nation/:id/events" element={<EventsPage />} />
      <Route path="/nation/:id/map" element={<MapPage />} />
      <Route path="/nation/:id/agents" element={<AgentsPage />} />
      <Route path="/nation/:id/military" element={<MilitaryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function NationNav({ nationId }: { nationId: string }) {
  return (
    <nav className="nation-nav" aria-label="Nation sections">
      <Link to="/demo">Dashboard</Link>
      <Link to={`/nation/${nationId}`}>Profile</Link>
      <Link to={`/nation/${nationId}/news`}>News</Link>
      <Link to={`/nation/${nationId}/events`}>Events</Link>
      <Link to={`/nation/${nationId}/map`}>Map</Link>
      <Link to={`/nation/${nationId}/agents`}>Agents</Link>
      <Link to={`/nation/${nationId}/military`}>Military</Link>
      <Link to="/create-nation">Create</Link>
    </nav>
  );
}
