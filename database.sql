
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- create a database called "100ym-ideal-week"

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT false,
    "setupComplete" BOOLEAN DEFAULT false,
    "introComplete" BOOLEAN DEFAULT false,
    "questionsComplete" BOOLEAN DEFAULT false,
    "prioritiesComplete" BOOLEAN DEFAULT false
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100)
);

INSERT INTO "category" ("name") VALUES 
('Sleep'),
('Self-Care'),
('Family and Relationships'),
('Personal Development'),
('Nutrition'),
('Leisure Time'),
('Community Involvement'),
('Creativity'),
('Work'),
('Measure What Matters');


CREATE TABLE "question" (
    "id" SERIAL PRIMARY KEY,
    "category_id" INT REFERENCES "category",
    "question_text" VARCHAR (1000)
);

INSERT INTO "question" ("category_id", "question_text") VALUES
(1, 'How many hours of sleep do I need to feel rested and energized?'),
(1, 'What sleep habits or routines should I prioritize to improve my sleep quality?'),
(1, 'What impact does lack of sleep have on my physical and mental well-being?'),
(2, 'What self-care activities do I enjoy and find beneficial?'),
(2, 'How can I incorporate self-care into my daily or weekly routine?'),
(2, 'What are the consequences of neglecting self-care in my life?'),
(3, 'Who are the most important people in my life and how much time do I want to spend with them?'),
(3, 'What can I do to strengthen my relationships with my loved ones?'),
(3, 'How do my relationships impact my overall happiness and well-being?'),
(4, 'What are my personal interests and passions?'),
(4, 'How can I incorporate personal growth and development into my daily routine?'),
(4, 'How does personal development contribute to my overall happiness and well-being?'),
(5, 'What types of foods do I enjoy that are also healthy and nutritious?'),
(5, 'How can I prioritize meal planning and preparation in my busy schedule?'),
(5, 'What impact does my diet have on my overall health and well-being?'),
(6, 'What leisure activities do I enjoy and find fulfilling?'),
(6, 'How can I incorporate leisure time into my daily or weekly routine?'),
(6, 'What is the value of leisure time in my life?'),
(7, 'What causes or organizations am I passionate about?'),
(7, 'How can I get involved in my local community?'),
(7, 'What impact does community involvement have on my sense of purpose and well-being?'),
(8, 'What creative pursuits do I enjoy and find fulfilling?'),
(8, 'How can I incorporate creative activities into my daily or weekly routine?'),
(8, 'What is the value of creativity in my life?'),
(9, 'How much time do I want to allocate for work in my ideal living week?'),
(9, 'What boundaries do I need to set to achieve a healthy work-life balance?'),
(9, 'What impact does work have on my overall happiness and well-being?'),
(10, 'What are my goals and values outlined in my 100 Year Manifesto?'),
(10, 'How can I measure my progress towards achieving these goals and values?'),
(10, 'What are the benefits of regularly measuring what matters most to me using our rubric?');


CREATE TABLE "answer" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "question_id" INT REFERENCES "question",
    "response" VARCHAR (1000)
);

CREATE TABLE "priority" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "category_id" INT REFERENCES "category",
    "rank" INT
);

CREATE TABLE "ideal_week" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "day" VARCHAR (20),
    "start_time" time (4),
    "end_time" time (4),
    "category_id" INT REFERENCES "category",
    "total_hours" numeric
);

ALTER TABLE "priority" ADD CONSTRAINT "priority_unique" UNIQUE("user_id", "category_id");