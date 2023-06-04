import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const newFilms = [];
const films = [
  { title: "Lady Bird", year: 2017, id: "film1" },
  { title: "La La Land", year: 2016, id: "film2" },
  { title: "Knives Out", year: 2019, id: "film3" },
  { title: "Decision to Leave", year: 2022, id: "film4" },
  { title: "Marriage Story", year: 2019, id: "film5" },
  { title: "Princess Mononoke", year: 1996, id: "film6" },
];

for (let element of films) {
  newFilms.push(
    await prisma.film.create({
      data: element,
    })
  );
}

const newUser = await prisma.user.create({
  data: {
    email: "prueba@email.com",
    username: "myusr",
    id: "user1",
  },
});

const newReviews = await prisma.review.createMany({
  data: [
    {
      filmId: newFilms[0].id,
      rating: 4.5,
      description: "Amazing",
      userId: newUser.id,
      id: "review1",
    },
    {
      filmId: newFilms[2].id,
      rating: 4,
      userId: newUser.id,
      id: "review2",
    },
    {
      filmId: newFilms[3].id,
      rating: 5,
      userId: newUser.id,
      id: "review3",
    },
  ],
});
