// components/ContextMenu.tsx
import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

export interface ContextMenuItem {
  /** The text to show in the menu */
  label: string;
  labelColor: string;
  /** Called when the item is clicked */
  onClick: (key: string) => void;
}

export interface ContextMenuProps {
  className: string;
  /** The menu items you want to render */
  items: ContextMenuItem[];
  /** The element(s) that will listen for right-clicks */
  children: React.ReactNode;
  currentChildKey: string;
  setSelectContextMenu: Dispatch<SetStateAction<string | null>>
  selectContextMenu: string | null
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  className,
  items,
  children,
  currentChildKey,
  setSelectContextMenu,
  selectContextMenu
}) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLUListElement>(null);

  // show menu at mouse position
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.pageX, y: e.pageY });
    setSelectContextMenu(currentChildKey);
  };

  // hide on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('scroll', () => setVisible(false));
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('scroll', () => setVisible(false));
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // when menu opens, move focus into it so onBlur works
  useEffect(() => {
    if (visible && menuRef.current) {
      menuRef.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (currentChildKey === selectContextMenu) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [currentChildKey, selectContextMenu]);

  return (
    <div onContextMenu={handleContextMenu} className={className}>
      {children}

      {visible && (
        <ul
          ref={menuRef}
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md"
          style={{ top: pos.y, left: pos.x, minWidth: '8rem', zIndex: 1000 }}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              className={
                item.labelColor ? "px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer " + item.labelColor
                  : "px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              }
              onClick={() => {
                item.onClick(currentChildKey);
                setVisible(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
