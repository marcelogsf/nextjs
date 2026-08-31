export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
};

export const empresas: Empresa[] = [
  {
    slug: "aurora-tech",
    nome: "Aurora Tech",
    sobre:
      "A Aurora Tech desenvolve soluções de tecnologia focadas em logística e inteligência de mercado desde 2020. Com sede no Recife e uma equipe distribuída por todo o país, nossa cultura é pautada na autonomia, transparência e aprendizado colaborativo.\n\nTemos programas permanentes de mentoria interna e valorizamos ativamente profissionais em transição de carreira, promovendo um ambiente seguro para o crescimento técnico contínuo.",
    site: "https://aurora.exemplo.br",
  },
  {
    slug: "nuvem-rosa",
    nome: "Nuvem Rosa",
    sobre:
      "A Nuvem Rosa é um estúdio de inovação e desenvolvimento móvel sediado em Olinda. Criamos aplicativos de alto impacto para os setores de saúde, educação e bem-estar, atendendo clientes no Brasil e no exterior.\n\nNossos squads são enxutos e altamente autônomos, trabalhando com metodologias ágeis e ciclos de entrega quinzenais focados na experiência do usuário final.",
    site: "https://nuvemrosa.exemplo.br",
  },
  {
    slug: "nexocore",
    nome: "NexoCore Sistemas",
    sobre:
      "A NexoCore é especializada no desenvolvimento de sistemas corporativos de missão crítica e infraestrutura em nuvem. Nossas soluções atendem grandes organizações do setor financeiro e varejo com alta escalabilidade e segurança.\n\nAcreditamos em boas práticas de engenharia de software, automação de processos e valorizamos a diversidade de trajetórias na formação do nosso time de tecnologia.",
    site: "https://nexocore.exemplo.br",
  },
  {
    slug: "horizonte-digital",
    nome: "Horizonte Digital",
    sobre:
      "A Horizonte Digital constrói experiências digitais modernas, combinando design de produto centrado no usuário com tecnologias web de ponta. Localizada em São Paulo com modelo híbrido de trabalho, atendemos marcas inovadoras em escala global.\n\nInvestimos continuamente no desenvolvimento de nossos colaboradores através de workshops, bolsas de estudo e participação em conferências do setor.",
    site: "https://horizonte.exemplo.br",
  },
  {
    slug: "dataflow-labs",
    nome: "DataFlow Labs",
    sobre:
      "A DataFlow Labs é uma empresa pioneira em soluções de dados e inteligência artificial aplicada. Auxiliamos companhias a transformar grandes volumes de dados brutos em decisões estratégicas e automações inteligentes.\n\nNossa equipe 100% remota é formada por especialistas apaixonados por dados, tecnologia aberta e resolução de problemas analíticos complexos.",
    site: "https://dataflow.exemplo.br",
  },
];

