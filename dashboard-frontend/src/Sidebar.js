import React from "react";

const Sidebar = ({title, linkList}) => (
<div className="dashboard__sidebar">
  <div className="dashboard__sidebar-container">
    <div className="dashboard__sidebar-title">{title}</div>
    <ul className="dashboard__sidebar-list">
      {
        Object
        .keys(linkList)
        .map(key =>
          <li key={key} index={key}><a href="{linkList[key]['text']}">{linkList[key]['text']}</a></li>)
        }
    </ul>
  </div>
</div>
);

export default Sidebar;