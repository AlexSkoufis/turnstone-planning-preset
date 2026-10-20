"use client";

/**
 * Link for pages that are not built yet. Keeps the real <a> semantics,
 * but a "#" href does nothing instead of jumping to the top of the page.
 */
export default function DeadLink({ href = "#", onClick, children, ...props }) {
  const handleClick = (event) => {
    if (href === "#") event.preventDefault();
    onClick?.(event);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
