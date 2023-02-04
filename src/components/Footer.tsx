import React from "react";

export default function Footer() {
  const footerTWStyles = `
        absolute bottom-0 w-full
    
        text-white
        flex items-center justify-center
        p-4
        

    `;
  return (
    <div className={`${footerTWStyles}`}>
      <p className='tracking-wider'>
        Made with
        <span role="img" aria-label="love">
          ❤️
        </span>
        using Next  JS
      </p>
    </div>
  );
}
