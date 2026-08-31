import MenuLink from "./MenuLink";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <strong>Leque de Vagas</strong>
      <nav>
        <MenuLink href="/">Início</MenuLink>
        <MenuLink href="/vagas">Vagas</MenuLink>
        <MenuLink href="/termos">Termos</MenuLink>
      </nav>
    </header>
  );
}
