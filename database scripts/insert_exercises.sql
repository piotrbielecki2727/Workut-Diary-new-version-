delete from exercises where id_exercise>0;


select * from exercises;

-- Partia: Waist
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Russian Twists', 'Waist', 'Obliques', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2021/12/how-to-do-a-kettlebell-russian-twist.gif', 'Russian Twists are an exercise that targets the obliques and waist area.', 'https://www.youtube.com/watch?v=wkD8rjkodUI', 'Beginner', 'Kettleball'),
('Hanging Leg Raises', 'Waist', 'Abs', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/12/captains-chair-knee-raise.gif', 'Hanging Leg Raises primarily target the lower abs and waist.', 'https://www.youtube.com/watch?v=3c9qkKypI-E', 'Intermediate', 'Pull-up Bar'),
('Plank', 'Waist', 'Abs', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/plank-movement.gif', 'The Plank is an isometric exercise that engages the entire core, including the waist area.', 'https://www.youtube.com/watch?v=ASdvN_XEl_c', 'Beginner', 'None');

-- Partia: Chest
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Dumbbell Bench Press', 'Chest', 'Triceps', 'Shoulders', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/09/dumbbell-incline-chest-press.gif', 'Dumbbell Bench Press targets the chest, triceps, and shoulders.', 'https://www.youtube.com/watch?v=JyCGkytLZ4E', 'Intermediate', 'Dumbbells'),
('Bench press', 'Chest', 'Shoulders', 'Triceps', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/04/barbell-bench-press.gif', 'Bench Press targets the chest, triceps, and shoulders.', 'https://www.youtube.com/watch?v=9aY1YgKUZ7A', 'Intermediate', 'Dumbbells'),
('Push-Ups', 'Chest', 'Triceps', 'Shoulders', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/push-up.gif', 'Push-ups primarily target the chest, triceps, and shoulders.', 'https://www.youtube.com/watch?v=_l3ySVKYVJ8', 'Beginner', 'None');

-- Partia: Shoulders
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Dumbbell Shoulder Press', 'Shoulders', 'Triceps', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/10/dumbbell-shoulder-press.gif', 'Dumbbell Shoulder Press targets the shoulders and triceps.', 'https://www.youtube.com/watch?v=JYVNvuh8N6w', 'Intermediate', 'Dumbbells'),
('Lateral Raises', 'Shoulders', 'Traps', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/dumbbell-lateral-raise.gif', 'Lateral Raises isolate and target the side deltoids.', 'https://www.youtube.com/watch?v=8MskcP0Z2SI', 'Intermediate', 'Dumbbells'),
('Front Raises', 'Shoulders', 'Front Delts', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/09/dumbbell-lateral-raise-variations.gif', 'Front Raises isolate and target the front deltoids.', 'https://www.youtube.com/watch?v=9efgcAjQeak', 'Intermediate', 'Dumbbells');
 
 
-- Partia: Back
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Pull-Ups', 'Back', 'Biceps', 'Shoulders', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up.gif', 'Pull-Ups primarily target the back, biceps, and shoulders.', 'https://www.youtube.com/watch?v=eGo4IYlbE5g', 'Intermediate', 'Pull-up Bar'),
('Chin-Ups', 'Back', 'Biceps', 'Shoulders', 'https://www.inspireusafoundation.org/wp-content/uploads/2023/05/weighted-chin-up-muscles.gif', 'Chin-Ups primarily target the back, biceps, and shoulders.', 'https://www.youtube.com/watch?v=RyJbvWAh6ec', 'Intermediate', 'Pull-up Bar'),
('Seated Cable Rows', 'Back', 'Biceps', 'Shoulders', 'https://www.inspireusafoundation.org/wp-content/uploads/2023/07/cable-wide-grip-row.gif', 'Seated Cable Rows target the back, biceps, and shoulders.', 'https://www.youtube.com/watch?v=-koP10y1qZI', 'Intermediate', 'Cable Machine');

-- Partia: Forearms
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Wrist Curls', 'Forearms', '', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2023/07/barbell-wrist-curl.gif', 'Wrist Curls target the forearms.', 'https://www.youtube.com/watch?v=HJiP2cPk-Bo', 'Beginner', 'Barbell'),
('Reverse Wrist Curls', 'Forearms', '', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2021/11/dumbbell-reverse-wrist-curl-muscles.gif', 'Reverse Wrist Curls target the forearms.', 'https://www.youtube.com/watch?v=sGxXEQJmFng', 'Beginner', 'Dumbbells'),
('Plate Pinches', 'Forearms', '', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/08/plate-pinches.gif', 'Plate Pinches help develop forearm strength and grip.', 'https://www.youtube.com/watch?v=tJ2eLEfsJKM', 'Beginner', 'Weight Plate');

-- Partia: Biceps
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Bicep Curls', 'Biceps', 'Forearms', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2023/01/inner-bicep-curl.gif', 'Bicep Curls isolate and target the biceps.', 'https://www.youtube.com/watch?v=BJ9b1-_3KvU', 'Beginner', 'Dumbbells'),
('Hammer Curls', 'Biceps', 'Biceps', 'Brachialis', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/04/dumbbell-hammer-curl.gif', 'Hammer Curls target the biceps and brachialis.', 'https://www.youtube.com/watch?v=TwD-YGVP4Bk', 'Intermediate', 'Dumbbells'),
('Barbell Curls', 'Biceps', 'Back', 'Shoulders', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/10/close-grip-barbell-curl.gif', 'Chin-Ups primarily target the biceps, back, and shoulders.', 'https://www.youtube.com/watch?v=_RdCQIv1QxI', 'Intermediate', 'Barbell');

-- Partia: Triceps
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Tricep Dips', 'Triceps', 'Chest', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2021/10/parallel-bar-dips.gif', 'Tricep Dips primarily target the triceps and chest.', 'https://www.youtube.com/watch?v=0326dy_-CzM', 'Intermediate', 'Parallel Bars'),
('Tricep Pushdowns', 'Triceps', 'Forearms', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2021/10/cable-tricep-pushdown.gif', 'Tricep Pushdowns isolate and target the triceps.', 'https://www.youtube.com/watch?v=sqOgy4IHKkg', 'Intermediate', 'Cable Machine'),
('Dumbbell Close-Grip Bench Press', 'Triceps', 'Chest', 'Shoulders', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/12/dumbbell-close-grip-press.gif', 'Close-Grip Bench Press targets the triceps, chest, and shoulders.', 'https://www.youtube.com/watch?v=vmnJNSAiMI0', 'Intermediate', 'Dumbbells');

-- Partia: Upper legs
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Squats', 'Upper Legs', 'Quadriceps', 'Glutes', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-full-squat.gif', 'Squats are a compound exercise that primarily targets the quadriceps and glutes.', 'https://www.youtube.com/watch?v=RXOa7sF2NcI', 'Intermediate', 'Barbell'),
('Leg Press', 'Upper Legs', 'Quadriceps', 'Glutes', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/10/leg-press.gif', 'Leg Press primarily targets the quadriceps and glutes.', 'https://www.youtube.com/watch?v=KkCJ_2qyS5o', 'Intermediate', 'Leg Press Machine'),
('Lunges', 'Upper Legs', 'Quadriceps', 'Glutes', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-lunges.gif', 'Lunges target the quadriceps and glutes.', 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', 'Intermediate', 'Dumbbells');


-- Partia: Lower legs
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Calf Raises', 'Lower Legs', 'Calves', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2023/03/dumbbell-calf-raise.gif', 'Calf Raises target the calf muscles.', 'https://www.youtube.com/watch?v=2GesCFfU3X0', 'Beginner', 'Dumbbells'),
('Seated Calf Raises', 'Lower Legs', 'Calves', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2021/06/squat-hold-calf-raises.gif', 'Seated Calf Raises target the calf muscles.', 'https://www.youtube.com/watch?v=FVflSG0aCBU', 'Beginner', ''),
('Box Jumps', 'Lower Legs', 'Quadriceps', 'Calves', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/box-jump.gif', 'Box Jumps engage the quadriceps and calf muscles.', 'https://www.youtube.com/watch?v=hxldGj3WTRE', 'Intermediate', 'Box');


-- Partia: Glutes
INSERT INTO `Exercises` (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`)
VALUES 
('Glute Bridges', 'Glutes', 'Hamstrings', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/12/glute-bridge.gif', 'Glute Bridges primarily target the glutes and hamstrings.', 'https://www.youtube.com/watch?v=MjAK8E19T5A', 'Beginner', ''),
('Romanian Deadlifts', 'Glutes', 'Hamstrings', 'Lower Back', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/06/barbell-romanian-deadlift-movement.gif', 'Romanian Deadlifts target the glutes, hamstrings, and lower back.', 'https://www.youtube.com/watch?v=JCXUYuzwNrM', 'Intermediate', 'Barbell'),
('Hip Thrusts', 'Glutes', 'Hamstrings', '', 'https://www.inspireusafoundation.org/wp-content/uploads/2022/09/barbell-hip-thrust.gif', 'Hip Thrusts primarily target the glutes and hamstrings.', 'https://www.youtube.com/watch?v=K-CrEi0ymMg', 'Intermediate', 'Barbell');

