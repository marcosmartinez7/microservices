import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href} className="nav-item">
            <a className="navbar-brand">{label}</a>
          </Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" className="nav-item">
        <a className="navbar-brand">Sapiens</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
