class Block {
  constructor(x, y, sprite, colors) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sprite = sprite;
    this.colors = colors;
  }

  draw() {
    let img = this.sprite[this.frame];
    for (let row = 0; row < img.length; row++) {
      let currentrow = img[row];
      for (let col = 0; col < currentrow.length; col++) {
        if (currentrow[col] == ".") continue;
        let color = currentrow[col];
        ctx.fillStyle = this.colors[color];
        ctx.fillRect(this.x + col * pxl, this.y + row * pxl, pxl, pxl);
      }
    }
  }
  increaseFrame() {
    this.frame++;
    this.frame %= 2;
  }
}

const pxl = 5;
const colors = {
  c1: [0, "#a80020", "#f83800", "#f8d878", "#f8b800"],
  c2: [0, "#f8d878", "#00a800", "#006800", "#f83800"]
};

const sprite = {
  pallet: {
    a: colors.c1,
    b: colors.c2,
    c: 0,
    d: 0
  },

  img: {
    brick: [
      [
        "11111111",
        "22433331",
        "11242431",
        "33124231",
        "24311111",
        "22143331",
        "24124241",
        "22122221"
      ],
      [
        "11111111",
        "21413131",
        "11141411",
        "31114131",
        "14111111",
        "21113131",
        "14121211",
        "21112121"
      ]
    ],

    hero: [
      [
        "..1111..",
        "..1414..",
        "3332223.",
        "13322233",
        "2.2222.1",
        "..2223.2",
        "..3..33.",
        "...3.33."
      ],
      [
        "..1111..",
        "..1414..",
        ".3222333",
        "33222331",
        "1.2222.2",
        "2.3222..",
        ".33..3..",
        ".33.3..."
      ]
    ]
  }
};
