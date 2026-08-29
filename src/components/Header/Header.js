import React from "react";

import Image from "next/image";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <Image
          src="/images/logo.png"
          alt="RealityStan Logo"
          width={548}
          height={312}
          className="header-logo"
          preload
        />
        <h1>RealityStan</h1>
      </div>
    </div>
  );
};

export default Header;
