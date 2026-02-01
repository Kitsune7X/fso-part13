-- Create a new table 'blogs' with a primary key and columns
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY UNIQUE,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

-- Insert data into 'blogs'
INSERT INTO blogs (author, url, title)
VALUES ('Jeff Hardy', 'https://www.youtube.com/watch?v=cquQmv0OD08', 'No more words');

INSERT INTO blogs (author, url, title)
VALUES ('CM Punk', 'https://www.youtube.com/watch?v=DMdqsS0a9tY', 'This Fire Burns');

SELECT * FROM blogs;

DROP TABLE blogs;