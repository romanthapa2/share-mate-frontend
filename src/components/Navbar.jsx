import React from 'react';
import { AuroraText } from '@/components/magicui/aurora-text';
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { getOrigin } from '@/config/conf';
import { useMyContext } from '../Provider/Context';
import { Copy, Files, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NavButton = ({ 
  active, 
  onClick, 
  children,
  className = ""
}) => (
  <ShimmerButton
    className={`shadow-xl ${active ? "text-black" : ""} ${className}`}
    background={active ? "white" : undefined}
    shimmerColor={active ? "#000000" : undefined}
    onClick={onClick}
  >
    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
      {children}
    </span>
  </ShimmerButton>
);

const CopyButton = ({ pin, isServerStart }) => {
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(`${getOrigin()}/${pin}`);
        toast.success('Copied to clipboard');
      } catch (err) {
        console.error('Failed to copy text:', err);
        toast.error('Failed to copy');
        // Fallback for browsers that don't support Clipboard API
        const copyInput = document.createElement('input');
        copyInput.value = `${getOrigin()}/${pin}`;
        document.body.appendChild(copyInput);
        copyInput.select();
        try {
          document.execCommand('copy');
          toast.success('Copied to clipboard');
        } catch (fallbackErr) {
          toast.error('Copy failed');
        } finally {
          document.body.removeChild(copyInput);
        }
      }
    };
  
    return (
      <div className="hidden md:block">
        <ShimmerButton 
          className="shadow-xl" 
          onClick={handleCopy}
          disabled={!isServerStart}
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            {getOrigin()}/{pin}
          </span>
          <Copy className="ms-2 w-4 h-4" />
        </ShimmerButton>
      </div>
    );
  };

const MobileNavButtons = ({ pin, isClient }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = isClient
    ? [
        { path: `/${pin}`, icon: <MessageCircle /> },
        { path: `/${pin}/files`, icon: <Files /> }
      ]
    : [
        { path: "/", icon: <MessageCircle /> },
        { path: "/files", icon: <Files /> }
      ];

  return (
    <div className="md:hidden flex items-center">
      {buttons.map((button) => (
        <NavButton
          key={button.path}
          active={location.pathname === button.path}
          onClick={() => navigate(button.path)}
          className="mx-1"
        >
          {button.icon}
        </NavButton>
      ))}
    </div>
  );
};

const AppNavbar = () => {
  const { pin, isServerStart } = useMyContext();
  const location = useLocation();
  const isClient = location.pathname !== "/" && location.pathname !== "/files";

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-white">
        <AuroraText>Share Mate</AuroraText>
      </h1>

      <CopyButton pin={pin} isServerStart={isServerStart} />
      <MobileNavButtons pin={pin} isClient={isClient} />
    </div>
  );
};

export default AppNavbar;