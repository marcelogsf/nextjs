import Link from "next/link";
import { vagas } from "@/data/vagas";
import { empresas } from "@/data/empresas";
import CardDeVaga from "@/components/CardDeVaga";

export default function Home() {
  const totalVagas = vagas.length;
  const vagasIniciantes = vagas.filter((v) => v.aceitaIniciante);
  const totalIniciantes = vagasIniciantes.length;
  const totalEmpresas = empresas.length;
  const totalRemotas = vagas.filter(
    (v) =>
      v.local.toLowerCase().includes("remoto") ||
      v.local.toLowerCase().includes("híbrido")
  ).length;

  const areasDestaque = [
    { nome: "Front-end", icone: "💻" },
    { nome: "Back-end", icone: "⚙️" },
    { nome: "Dados", icone: "📊" },
    { nome: "Mobile", icone: "📱" },
    { nome: "QA", icone: "🧪" },
    { nome: "Design", icone: "🎨" },
  ];

  const vagasDestaque = vagasIniciantes.slice(0, 4);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span>🚀</span>
          <span>Sua porta de entrada para o mercado tech</span>
        </div>
        <h1 className="hero-title">
          Conectamos você às melhores{" "}
          <span className="hero-gradient-text">oportunidades em tecnologia</span>
        </h1>
        <p className="hero-desc">
          Plataforma pensada para quem está começando ou migrando de carreira. Vagas reais,
          empresas com cultura de mentoria e sem exigências irreais para posições de entrada.
        </p>
        <div className="hero-actions">
          <Link href="/vagas" className="btn-primario">
            Explorar todas as vagas →
          </Link>
          <Link href="/vagas" className="btn-secundario">
            Vagas para iniciantes ({totalIniciantes})
          </Link>
        </div>
      </section>

      {/* Métricas da Plataforma */}
      <section>
        <div className="metricas-grid">
          <div className="metrica-card">
            <div className="metrica-numero destaque-azul">{totalVagas}+</div>
            <div className="metrica-label">Vagas disponíveis</div>
          </div>
          <div className="metrica-card">
            <div className="metrica-numero destaque-azul-claro">{totalIniciantes}</div>
            <div className="metrica-label">Aceitam iniciantes</div>
          </div>
          <div className="metrica-card">
            <div className="metrica-numero destaque-azul-intenso">{totalEmpresas}</div>
            <div className="metrica-label">Empresas parceiras</div>
          </div>
          <div className="metrica-card">
            <div className="metrica-numero destaque-ciano">{totalRemotas}</div>
            <div className="metrica-label">Remotas / Híbridas</div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section>
        <div className="secao-cabecalho">
          <div>
            <h2 className="secao-titulo">Explorar por Especialidade</h2>
            <p className="secao-subtitulo">
              Filtre oportunidades pelo stack e área que você mais domina
            </p>
          </div>
          <Link href="/vagas" className="secao-link">
            Ver todas as áreas →
          </Link>
        </div>
        <div className="areas-grid">
          {areasDestaque.map((area) => {
            const quantidade = vagas.filter((v) => v.area === area.nome).length;
            return (
              <Link key={area.nome} href="/vagas" className="area-card">
                <div className="area-card-info">
                  <span className="area-card-icone">{area.icone}</span>
                  <span className="area-card-nome">{area.nome}</span>
                </div>
                <span className="area-card-badge">
                  {quantidade} {quantidade === 1 ? "vaga" : "vagas"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Vagas em Destaque */}
      <section>
        <div className="secao-cabecalho">
          <div>
            <h2 className="secao-titulo">Vagas em Destaque</h2>
            <p className="secao-subtitulo">
              Oportunidades recentes com ambiente acolhedor e programas de acolhimento
            </p>
          </div>
          <Link href="/vagas" className="secao-link">
            Ver todas as {totalVagas} vagas →
          </Link>
        </div>
        <ul className="lista">
          {vagasDestaque.map((vaga) => (
            <CardDeVaga key={vaga.id} vaga={vaga} />
          ))}
        </ul>
      </section>

      {/* Empresas Parceiras */}
      <section>
        <div className="secao-cabecalho">
          <div>
            <h2 className="secao-titulo">Empresas Apoiadoras</h2>
            <p className="secao-subtitulo">
              Organizações que valorizam a diversidade e o desenvolvimento de novos talentos
            </p>
          </div>
        </div>
        <div className="empresas-grid">
          {empresas.map((empresa) => {
            const vagasCount = vagas.filter((v) => v.empresaSlug === empresa.slug).length;
            return (
              <Link
                key={empresa.slug}
                href={`/empresas/${empresa.slug}`}
                className="empresa-card"
              >
                <div>
                  <div className="empresa-card-topo">
                    <span className="empresa-card-nome">{empresa.nome}</span>
                    <span className="empresa-card-vagas">
                      {vagasCount} {vagasCount === 1 ? "vaga" : "vagas"}
                    </span>
                  </div>
                  <p className="empresa-card-desc">{empresa.sobre}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Diferenciais */}
      <section>
        <div className="secao-cabecalho">
          <div>
            <h2 className="secao-titulo">Por que o Leque de Vagas?</h2>
            <p className="secao-subtitulo">
              Construído para aproximar pessoas candidatas de empresas que realmente ensinam
            </p>
          </div>
        </div>
        <div className="diferenciais-grid">
          <div className="diferencial-card">
            <div className="diferencial-icone">🎯</div>
            <h3 className="diferencial-titulo">Foco em Início & Transição</h3>
            <p className="diferencial-desc">
              Sem exigências irreais de anos de experiência prévia para vagas de nível júnior
              ou estágio.
            </p>
          </div>
          <div className="diferencial-card">
            <div className="diferencial-icone">🤝</div>
            <h3 className="diferencial-titulo">Cultura de Mentoria</h3>
            <p className="diferencial-desc">
              Empresas parceiras comprometidas com pareamento técnico, aprendizado contínuo e
              feedback construtivo.
            </p>
          </div>
          <div className="diferencial-card">
            <div className="diferencial-icone">🌐</div>
            <h3 className="diferencial-titulo">Remoto & Sem Barreiras</h3>
            <p className="diferencial-desc">
              Grande maioria das oportunidades permite trabalho 100% remoto ou modelos flexíveis
              em todo o Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner Final */}
      <section className="cta-banner">
        <h3>Pronto para dar o próximo passo na sua carreira?</h3>
        <p>
          Explore agora mesmo todas as oportunidades abertas e dê o pontapé inicial na sua
          jornada na área de tecnologia.
        </p>
        <Link href="/vagas" className="btn-primario">
          Ver todas as vagas disponíveis →
        </Link>
      </section>
    </div>
  );
}