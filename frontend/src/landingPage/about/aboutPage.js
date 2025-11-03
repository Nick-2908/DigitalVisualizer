import React from "react";

import Developers from "./dev";
import Impact from "./impact";
import Introduction from "./intro";



function AboutPage() {
  return (
    // We re-use the main layout from Hero.js to center the card
    <main className="container d-flex flex-grow-1 align-items-center py-5">
      <div style={{ width: '100%', maxWidth: '65rem', margin: '0 auto' }}>
        
        {/* This is now the ONE card for the whole page.
          We use p-5 for large, clean padding.
        */}
        <div className="hero-card p-5">
          
          {/* This flex container adds a large gap-5 between each section */}
          <div className="d-flex flex-column align-items-center gap-5">
            
            {/* Section 1 */}
            <Introduction />
            
            {/* A clean divider */}
            <div className="hero-divider w-100" />
            
            {/* Section 2 */}
            <Impact />
            
            {/* A clean divider */}
            <div className="hero-divider w-100" />
            
            {/* Section 3 */}
            <Developers />
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;