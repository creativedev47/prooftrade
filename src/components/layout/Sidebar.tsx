import { Button } from "@/components/ui/button";
import { 
  Home,
  Users,
  Play,
  BookOpen
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 glass border-r border-border p-6 flex flex-col">
      <Link to="/">
        <h2 className="text-2xl font-bold text-gradient mb-8">ProofTrade</h2>
      </Link>
      
      <nav className="flex-1 space-y-2">
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${currentPath === '/dashboard' ? 'bg-muted' : ''}`}
          asChild
        >
          <Link to="/dashboard">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${currentPath === '/mentors' ? 'bg-muted' : ''}`}
          asChild
        >
          <Link to="/mentors">
            <Users className="w-5 h-5 mr-3" />
            Mentors
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${currentPath === '/replays' ? 'bg-muted' : ''}`}
          asChild
        >
          <Link to="/replays">
            <Play className="w-5 h-5 mr-3" />
            Replays
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${currentPath === '/lessons' ? 'bg-muted' : ''}`}
          asChild
        >
          <Link to="/lessons">
            <BookOpen className="w-5 h-5 mr-3" />
            Lessons
          </Link>
        </Button>
      </nav>
    </aside>
  );
}
