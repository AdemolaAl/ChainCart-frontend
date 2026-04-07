import { navbarItemsContent } from "@/CONSTANT/data";
import { useState } from "react";
import { Link } from "react-router-dom";

function SubHeader() {
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  return (
    <>
      <div className="hidden md:grid container mx-auto px-4 py-3 grid-cols-1 md:grid-cols-2 text-xs text-gray-500 border-b border-gray-800/30">
        <div className="flex gap-3 items-center">
          {navbarItemsContent.menu.map((item, index) => (
            <Link key={index} to={item.href} className="!text-gray-500 hover:!text-cyan-400 transition-colors">{item.name}</Link>
          ))}
        </div>
        <div className="flex justify-between items-center gap-2 col-span-1">
          <p className="flex gap-2 items-center text-gray-500">{navbarItemsContent.subtext}</p>
          <p className="text-gray-500">
            {navbarItemsContent.contactText}{' '}
            <span className="font-bold text-gray-400">{navbarItemsContent.contactSpanText}</span>
          </p>
        </div>
      </div>

      <div className="md:hidden container mx-auto px-4 py-2 border-b border-gray-800/30">
        <button className="text-xs flex items-center gap-1 text-gray-500" onClick={() => setIsSecondaryMenuOpen(!isSecondaryMenuOpen)}>
          More info
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isSecondaryMenuOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isSecondaryMenuOpen && (
          <div className="mt-2 text-xs space-y-3 pb-2">
            <div className="flex flex-wrap gap-3">
              {navbarItemsContent.menu.map((item, index) => (
                <Link key={index} to={item.href} className="py-1 !text-gray-500 hover:!text-cyan-400">{item.name}</Link>
              ))}
            </div>
            <p className="text-gray-500">{navbarItemsContent.subtext}</p>
            <p className="text-gray-500">{navbarItemsContent.contactText} <span className="font-bold">{navbarItemsContent.contactSpanText}</span></p>
          </div>
        )}
      </div>
    </>
  );
}

export default SubHeader;
