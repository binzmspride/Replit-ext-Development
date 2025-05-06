import { Heart, Instagram, Facebook, Twitter, Bookmark } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-primary mr-2 fill-primary" />
              <span className="text-lg font-poppins font-semibold text-primary">HeartDraw</span>
            </div>
            <p className="text-sm text-neutral-600 mt-1">Express your love through art</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-neutral-600 hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary">
              <Bookmark className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="border-t border-neutral-300 mt-4 pt-4 text-center text-sm text-neutral-600">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <Link href="#" className="hover:text-primary">About</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Help</Link>
            <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} HeartDraw. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
