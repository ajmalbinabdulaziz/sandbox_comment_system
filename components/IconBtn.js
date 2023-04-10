export function IconBtn({ Icon, isActive, color, children, ...props }) {
    return (
      <button
        className={`btn icon-btn ${isActive ? "icon-btn-active" : ""} ${
          color || ""
        }`}
        {...props}
      >
        <span className={`${children != undefined ? "mr-1" : ""}`}>
          <Icon />
        </span>
        {children}
      </button>
    )
  }
  