import React from "react";
import Link from "next/link";

interface TabProps {
  active?: boolean;
  label: string;
  route: string;
}

const Tab: React.FC<TabProps> = ({ active, label, route }) => {
  return (
    <div className={`tab ${active ? "active-tab" : ""}`}>
      <Link href={route}>
        <a
          style={{
            textDecoration: "none",
            color: active ? "#ff4500" : "#369",
          }}
        >
          {label}
        </a>
      </Link>

      <style jsx>
        {`
          .tab {
            font-size: 12px;
            font-weight: bold;
            font-family: verdana, arial, helvetica, sans-serif;
            padding: 2px 6px 0 6px;
            background-color: #eff7ff;
            margin: 0 3px;
            margin-bottom: -1px;
            border-bottom: 1px solid #5f99cf;
          }
          .active-tab {
            background-color: #ffffff;
            border: 1px solid #5f99cf;
            border-bottom-color: #ffffff;
            z-index: 100;
          }
        `}
      </style>
    </div>
  );
};

export default Tab;
