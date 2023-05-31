import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const newFilms = [];
const films = [
  { title: "Lady Bird", year: 2017 },
  { title: "La La Land", year: 2016 },
  { title: "Knives Out", year: 2019 },
  { title: "Decision to Leave", year: 2022 },
  { title: "Marriage Story", year: 2019 },
  { title: "Princess Mononoke", year: 1997 },
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
    username: "user1",
  },
});

const newReviews = await prisma.review.createMany({
  data: [
    {
      filmId: newFilms[0].id,
      rating: 4.5,
      description: "Amazing",
      userId: newUser.id,
    },
    { filmId: newFilms[2].id, rating: 4, userId: newUser.id },
    { filmId: newFilms[3].id, rating: 5, userId: newUser.id },
  ],
});
