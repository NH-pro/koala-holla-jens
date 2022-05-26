CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"gender" VARCHAR (1) NOT NULL,
	"age" INTEGER,
  	"ready_to_transfer" VARCHAR (1) NOT NULL,
  	"notes" VARCHAR (250)
);


INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Scotty', 'M', '4', 'Y', 'born in Guatemala'),
('Jean', 'F', '5', 'Y', 'Allergic to lots of lava'),
('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)'),
('Logan', 'M', '15', 'N', 'Loves the sauna'),
('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana' ),
('Betsy', 'F', '4', 'Y', 'Has a pet iguana');

