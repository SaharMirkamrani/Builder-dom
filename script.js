function Comments() {
  this.records = [
    {
      id: "1",
      text:
        "Great welcoming experience to the Dominican. We used Otium for the airport transport- we were to the resort in 20 minutes. Ralphy has been our concierge for the first half of the stay, he been very helpful- always able to pull through for anything we request",
      username: "Jake W",
      imageurl:
        "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/9e/avatar069.jpg",
      date: "January 2020",
      point: 11,
    },
    {
      id: "2",
      text:
        "We travelled as a group of 13 ages 18 to 80 and this resort was enjoyed by all. We’ve been fortunate to travel to many resorts in Punta Cana but the Grand was by far the best",
      username: "Andrea C",
      imageurl:
        "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/55/avatar028.jpg",
      date: "Jan 2020",
      point: 14,
    },
    {
      id: "3",
      text:
        "The Hotel opened 1-1,5 hs ago. Everything is new and very clean. Even the cheapest rooms are very spacious (77square meters and room and dinning area with sofa bed are divided by a sliding door).",
      username: "sergiogiaco",
      imageurl:
        "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/74/avatar056.jpg",
      date: "Dec 2020",
      point: 11,
    },
  ];
  this.like = function (id) {
    this.records[id - 1].point ++ ;
    
  };
  this.dislike = function (id) {
    this.records[id - 1].point -- ;
  };
  this.add = function () {};
  this.remove = function (record) {
    const index = this.records.indexOf(record);
    if (index !== -1) {
      this.records.splice(index, 1);
    }
  };
}

function ElementBuilder(name) {
  this.element = document.createElement(name);

  this.text = function (text) {
    this.element.textContent = text;
    return this;
  };

  this.url = function (url) {
    this.element.src = url;
    return this;
  };

  this.appendTo = function (parent) {
    if (parent instanceof ElementBuilder) {
      parent.build().appendChild(this.element);
    } else {
      parent.appendChild(this.element);
    }
    return this;
  };

  this.className = function (className) {
    this.element.className = className;
    return this;
  };

  this.onclick = function (fn) {
    this.element.onclick = fn;
    return this;
  };

  this.build = function () {
    return this.element;
  };
}

const builder = {
  create: function (name) {
    return new ElementBuilder(name);
  },
};

function Painter(container) {
  const commentsObj = new Comments();
  this.container = container;
  let comments = commentsObj.records;

  function paint() {
    root.innerHTML = "";
    const main = builder.create("div").className("main").appendTo(root).build();
    comments.forEach(function (comment) {
      const card = builder
        .create("div")
        .className("card")
        .appendTo(main)
        .build();
      const head = builder
        .create("div")
        .className("head")
        .appendTo(card)
        .build();
      const text = builder
        .create("div")
        .text(`${comment.text}`)
        .className("text")
        .appendTo(card)
        .build();

      builder.create("br").appendTo(card);
      const date = builder
        .create("div")
        .text(`${comment.date}`)
        .className("date")
        .appendTo(text)
        .build();
      const left = builder
        .create("div")
        .className("left")
        .appendTo(head)
        .build();
      const image = builder
        .create("div")
        .className("image")
        .appendTo(left)
        .build();
      const img = builder
        .create("img")
        .url(`${comment.imageurl}`)
        .appendTo(image)
        .className("image-itself")
        .build();
      const name = builder
        .create("div")
        .text(`${comment.username}`)
        .className("name")
        .appendTo(left)
        .build();
      const right = builder
        .create("div")
        .className("right")
        .appendTo(head)
        .build();
      const points = builder
        .create("div")
        .className("points")
        .appendTo(right)
        .text(`total points: ${comment.point}`)
        .build();
      const rate = builder
        .create("div")
        .className("rate")
        .appendTo(right)
        .build();
      const thumbsUp = builder
        .create("div")
        .text(`👍`)
        .onclick(() => {
          commentsObj.like(comment.id)
          paint();
        })
        .className("thumbsUp")
        .appendTo(rate);
      const thumbsDown = builder
        .create("div")
        .text(`👎`)
        .onclick(() => {
          commentsObj.dislike(comment.id)
          paint();
        })
        .className("thumbsDown")
        .appendTo(rate);
    });
  }

  this.init = function () {
    paint();
  };
}

const root = document.querySelector(".root");
const app = new Painter(root);
app.init();
