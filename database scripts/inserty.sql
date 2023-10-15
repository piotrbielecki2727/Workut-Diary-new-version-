INSERT INTO muscle_groups (id_muscle_groups, muscle_group, img_src) VALUES
(1, 'All exercises', './muscleimg/core.png'),
(2, 'Abs', './muscleimg/abs.png'),
(3, 'Chest', './muscleimg/chest.png'),
(4, 'Shoulders', './muscleimg/shoulders.png'),
(5, 'Neck', './muscleimg/neck.png'),
(6, 'Back', './muscleimg/back.png'),
(7, 'Biceps', './muscleimg/biceps.png'),
(8, 'Forearms', './muscleimg/forearms.png'),
(9, 'Triceps', './muscleimg/triceps.png'),
(10, 'Glutes', './muscleimg/glutes.png'),
(11, 'Upper legs', './muscleimg/upper_legs.png'),
(12, 'Lower legs', './muscleimg/lower_legs.png');



INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Bench Press', 'Chest', 'Triceps', 'Shoulders', 'https://api.exercisedb.io/image/0rkMB1qAD3bilK', 'The bench press is a compound exercise that targets the chest, triceps, and shoulders.', 'https://www.youtube.com/watch?v=SCVCLChPQFY', 'Intermediate', 'Barbell'),
('Push-Up', 'Chest', 'Triceps', 'Shoulders', 'https://api.exercisedb.io/image/wBIFH3iUmIlJN8', 'The push-up is a bodyweight exercise that primarily works the chest, triceps, and shoulders.', 'https://www.youtube.com/watch?v=_l3ySVKYVJ8', 'Beginner', 'Bodyweight'),
('Squat', 'Upper legs', 'Lower legs', 'Glutes', 'https://api.exercisedb.io/image/oMa3FEqGtfvESw', 'The squat is a lower body exercise that targets the quadriceps, hamstrings, and glutes.', 'https://www.youtube.com/watch?v=ultWZbUMPL8', 'Intermediate', 'Barbell'),
('Pull-Up', 'Back', '', 'Shoulders', 'https://api.exercisedb.io/image/mrPkQ7n5GzDUW1', 'The pull-up is a bodyweight exercise that targets the back, biceps, and shoulders.', 'https://www.youtube.com/watch?v=aAggnpPyR6E', 'Intermediate', 'Pull-Up Bar'),
('Dumbbell incline bench press', 'Chest', 'Triceps', 'Shoulders', 'https://api.exercisedb.io/image/q48A3wPuBET0Yd', 'In this exercise, you lie down on an incline bench set at an angle (usually around 30-45 degrees) ly extended.', 'https://www.youtube.com/watch?v=qSmo-8QapTg', 'Beginner', 'Dumbbell');
