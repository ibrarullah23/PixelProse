import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ children, buttonElement  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {buttonElement}
      </div>

      {isOpen && (
        <div className="*:w-full *:px-2 *:py-1 *:rounded-md *:cursor-pointer *:text-sm 
    border font-details theme-bg theme-text  w-[200px] z-10 flex  flex-col items-start  absolute top-8 right-2 rounded-md p-3 space-y-3">
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              onClick: () => setIsOpen(false),
              className: "hover:bg-zinc-500/20  gap-2 items-center flex "
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
