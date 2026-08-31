import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Leque de Vagas 💼</h1>
      <p>
        Plataforma de vagas em tecnologia para quem está migrando de carreira ou começando na área.
      </p>
      <p style={{ marginTop: "16px" }}>
        <Link href="/vagas" style={{ color: "#38bdf8", textDecoration: "underline" }}>
          Explorar todas as vagas abertas →
        </Link>
      </p>
    </section>
  );
}