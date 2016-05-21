INSERT INTO users VALUES 
	(null, 'Anthony', 'tution', 'instructor', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(null, 'Sam', 'CoffeeNut', 'student', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(null, 'Patrick', 'BottleCap', 'student', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(null, 'Gina', 'AngelWing', 'student', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(null, 'Timmy', 'Typhoon', 'student', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(null, 'Tylor', 'StarDust', 'student', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(null, 'Amelia', 'HorseRider', 'student', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(null, 'Hyner', 'DarkChocolate', 'student', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(null, 'Pamela', 'TrackTrack', 'student', 'Anthony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO assignments VALUES 
    (null,'../poems/Test.txt','assignment 1','John Ashbery','Leave Comments','Anthony',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (null,'../poems/Test.txt','assignment 2','William Allington','Leave Comments','Anthony',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (null,'../poems/Test.txt','assignment 3','Deborah Ager','Leave Comments','Anthony',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (null,'../poems/Test.txt','assignment 4','Ralph Angel','Leave Comments','Anthony',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (null,'../poems/Test.txt','assignment 5','Alfred Austin','Leave Comments','Anthony',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (null,'../poems/Test.txt','assignment 6','Emily Bronte','Leave Comments','Anthony',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (null,'../poems/Test.txt','assignment 7','Edger Bower','Leave Comments','Anthony',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (null,'../poems/Test.txt','assignment 8','Michael Burch','Leave Comments','Anthony',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO comments VALUES
  (null, 1, 1, 'This is my favorite part of the poem.', 5, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'Beautifully described.', 4, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Very good beginning.', 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'Little difficult words.', 8, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Little difficult to understand the meaning of this part.', 5, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Very well written.', 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'Nice use of words', 7, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'How beautiful.', 3, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Impressive.', 5, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'I like this part the best.', 2, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'This is my favorite poem.', 4, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'I like the way it is written.', 2, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Nice use of words for beginning', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'I need some help to understand this part.', 7, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'I like the way it is written.', 6, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Little difficult to understand', 2, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Difficult to understand but beautiful.', 4, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Please explain the meaning.', 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 1, 1, 'The best part of poem', 3, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 2, 1, 'Explain please.', 2, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);