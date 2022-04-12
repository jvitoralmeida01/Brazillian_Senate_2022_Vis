const fetchText = async (url) => {
  const response = await fetch(url);
  return await response.text();
};

let corPartidoMap = new Map();
const getCorPartidor = (partido) => {
  if (corPartidoMap.has(partido)) {
    return corPartidoMap.get(partido);
  } else {
    let randomColor = [];
    randomColor.push(Math.floor(Math.random() * 120) + 100);
    randomColor.push(Math.floor(Math.random() * 120) + 100);
    randomColor.push(Math.floor(Math.random() * 120) + 100);
    return corPartidoMap.set(
      partido,
      "rgb(" +
        randomColor[0] +
        ", " +
        randomColor[1] +
        ", " +
        randomColor[2] +
        ")"
    );
  }
};

const csvUrl = "./Senadores.csv";
// //"https://raw.githubusercontent.com/nivan/testPython/main/ListaParlamentarEmExercicio.csv";

let data;

fetchText(csvUrl)
  .then((text) => {
    //tratar dados
    data = d3.csvParse(text);
    return data;
  })
  .then((data) => {
    //ações
    let dataIndex = 8;
    let currSenador = data[dataIndex];

    let fullSvg = d3.select("div").select("svg");
    let group = fullSvg.select("g");

    let image = d3.select("img");
    let labelNome = d3.select("h1");
    let labelPartido = d3.select("h2");

    let circles = group.selectAll("circle");
    circles
      .data(data)
      .style("fill", (d) => {
        return getCorPartidor(d.SiglaPartidoParlamentar);
      })
      .text((d) => d.NomeParlamentar + " " + d.SiglaPartidoParlamentar)
      .on("click", function (event, d) {
        image.attr("src", () => {
          return d.UrlFotoParlamentar;
        });

        labelNome.text(d.NomeParlamentar);

        labelPartido
          .style("color", getCorPartidor(d.SiglaPartidoParlamentar))
          .text(d.SiglaPartidoParlamentar);
      });
  });

//svgTitle.innerHTML = nome;
