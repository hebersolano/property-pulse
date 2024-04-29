import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl">Welcome</h1>
      <Link href="/properties">Properties 2</Link>
    </div>
  );
}

export default HomePage;
