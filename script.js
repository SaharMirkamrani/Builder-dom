function CommentsRecord({
  id,
  text,
  username,
  imageurl,
  date,
  point,
} = sample) {
  this.id = id;
  this.text = text;
  this.username = username;
  this.imageurl = imageurl;
  this.date = date;
  this.point = point;
}

const sample = {
  id: Math.floor(Math.random() * 100),
  text: "It was enjoyable indeed.",
  username: "Sahar.mk_",
  imageurl:
    "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/9e/avatar069.jpg",
  date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
  point: 0,
};

const sample2 = {
  name: "Sahar",
  text: "This trip was a blast!",
};

const record = new CommentsRecord();
console.log(record);

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

  this.like = function (comment) {
    const index = this.records.indexOf(comment);
    this.records[index].point++;
  };

  this.dislike = function (comment) {
    const index = this.records.indexOf(comment);
    this.records[index].point--;
  };

  this.add = function (name, text) {
    const record = new CommentsRecord();
    record.username = name;
    record.text = text;
    this.records.push(record);
  };

  this.remove = function (comment) {
    const index = this.records.indexOf(comment);
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

  this.type = function (text) {
    this.element.type = text;
    return this;
  };

  this.placeHolder = function (text) {
    this.element.placeholder = text;
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
      const remove = builder
        .create("button")
        .appendTo(card)
        .text("x")
        .className("btn")
        .onclick(() => {
          commentsObj.remove(comment);
          paint();
        })
        .build();
      builder.create("br").appendTo(card);
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
          commentsObj.like(comment);
          paint();
        })
        .className("thumbsUp")
        .appendTo(rate);
      const thumbsDown = builder
        .create("div")
        .text(`👎`)
        .onclick(() => {
          commentsObj.dislike(comment);
          paint();
        })
        .className("thumbsDown")
        .appendTo(rate);
    });
    const formGroup = builder
      .create("div")
      .appendTo(main)
      .className("form-group")
      .build();
    const userName = builder
      .create("input")
      .appendTo(formGroup)
      .type("text")
      .placeHolder("Username...")
      .className("username")
      .build();
    builder.create("br").appendTo(formGroup).build();
    const textArea = builder
      .create("textarea")
      .appendTo(formGroup)
      .type("text")
      .placeHolder("Add your comment here ...")
      .className("textArea")
      .build();
    const submit = builder
      .create("button")
      .text("Submit")
      .type("button")
      .onclick(() => {
        let name = userName.value;
        let text = textArea.value;
        if (name === "" || text === "") {
          name = "Random user";
          text = "You did not enter any text";
        }
        commentsObj.add(name, text);
        console.log(commentsObj.records);
        paint();
      })
      .className("submit")
      .appendTo(formGroup)
      .build();
  }

  this.init = function () {
    paint();
  };
}

const root = document.querySelector(".root");
const app = new Painter(root);
app.init();
