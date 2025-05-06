import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function WelcomeScreen() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-800 mb-4">
          Create Beautiful Heart Drawings
        </h2>
        <p className="text-lg text-neutral-600 mb-8">
          Express your creativity with our intuitive heart drawing tools. 
          Sign up to save and share your creations!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-full h-48 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
              <div className="relative">
                <svg viewBox="0 0 100 100" width="120" height="120">
                  <path 
                    d="M50,30 C35,10 10,20 10,40 C10,60 30,70 50,90 C70,70 90,60 90,40 C90,20 65,10 50,30 Z" 
                    fill="#FF5A79" 
                    stroke="#FF3366" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-2">Express Your Love</h3>
            <p className="text-neutral-600">
              Create unique heart designs for your loved ones or special occasions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-full h-48 bg-secondary/10 rounded-lg mb-4 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2">
                <svg viewBox="0 0 50 50" width="50" height="50">
                  <path d="M25,15 C17.5,5 5,10 5,20 C5,30 15,35 25,45 C35,35 45,30 45,20 C45,10 32.5,5 25,15 Z" fill="#FF3366" />
                </svg>
                <svg viewBox="0 0 50 50" width="50" height="50">
                  <path d="M25,15 C17.5,5 5,10 5,20 C5,30 15,35 25,45 C35,35 45,30 45,20 C45,10 32.5,5 25,15 Z" fill="#9C27B0" />
                </svg>
                <svg viewBox="0 0 50 50" width="50" height="50">
                  <path d="M25,15 C17.5,5 5,10 5,20 C5,30 15,35 25,45 C35,35 45,30 45,20 C45,10 32.5,5 25,15 Z" fill="#3F51B5" />
                </svg>
                <svg viewBox="0 0 50 50" width="50" height="50">
                  <path d="M25,15 C17.5,5 5,10 5,20 C5,30 15,35 25,45 C35,35 45,30 45,20 C45,10 32.5,5 25,15 Z" fill="#FF8FA3" />
                </svg>
                <svg viewBox="0 0 50 50" width="50" height="50">
                  <path d="M25,15 C17.5,5 5,10 5,20 C5,30 15,35 25,45 C35,35 45,30 45,20 C45,10 32.5,5 25,15 Z" fill="#E91E63" />
                </svg>
                <svg viewBox="0 0 50 50" width="50" height="50">
                  <path d="M25,15 C17.5,5 5,10 5,20 C5,30 15,35 25,45 C35,35 45,30 45,20 C45,10 32.5,5 25,15 Z" fill="#673AB7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-2">Build Your Collection</h3>
            <p className="text-neutral-600">
              Save your creations and build a personal gallery of heart drawings.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-primary text-white px-8 py-3 text-lg hover:bg-accent transition-colors shadow-md rounded-full"
            asChild
          >
            <Link href="/auth">Sign Up Now</Link>
          </Button>
          <Button 
            variant="outline"
            className="bg-white text-primary border border-primary px-8 py-3 text-lg hover:bg-primary/5 transition-colors rounded-full"
            asChild
          >
            <Link href="/auth">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
