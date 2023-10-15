
CREATE TABLE IF NOT EXISTS `Users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `Role` VARCHAR(10) NOT NULL,
  `level` VARCHAR(20) DEFAULT NULL,
  `Weight` INT DEFAULT NULL,
  `Height` INT DEFAULT NULL,
  `avatar` VARCHAR(100) DEFAULT NULL,
  `Status` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_user`));



-- -----------------------------------------------------
-- Table `Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Workouts` (
  `id_workout` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(20) NULL DEFAULT NULL,
  `Date` DATE NULL DEFAULT NULL,
  `Users_id_user` INT NOT NULL,
  PRIMARY KEY (`id_workout`),
  INDEX `fk_Workouts_Users_idx` (`Users_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_Workouts_Users`
    FOREIGN KEY (`Users_id_user`)
    REFERENCES `Users` (`id_user`));



-- -----------------------------------------------------
-- Table `Exercises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Exercises` (
  `id_exercise` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40) NULL,
  `main_muscle_group` VARCHAR(45) NULL,
  `muscle_group_1` VARCHAR(20) NULL DEFAULT NULL,
  `muscle_group_2` VARCHAR(20) NULL DEFAULT NULL,
  `gif` VARCHAR(100) NULL,
  `description` VARCHAR(200) NULL,
  `video` VARCHAR(100) NULL,
  `difficulty` VARCHAR(20) NULL,
  `equipment` VARCHAR(20) NULL,
  PRIMARY KEY (`id_exercise`));


-- -----------------------------------------------------
-- Table `Sets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sets` (
  `id_set` INT NOT NULL AUTO_INCREMENT,
  `Exercise_id` INT NOT NULL,
  `Repetitions` INT NULL DEFAULT NULL,
  `Weight` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_set`),
  INDEX `fk_Sets_Exercises_idx` (`Exercise_id` ASC) VISIBLE,
  CONSTRAINT `fk_Sets_Exercises`
    FOREIGN KEY (`Exercise_id`)
    REFERENCES `Exercises` (`id_exercise`));


-- -----------------------------------------------------
-- Table `Workout_Exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Workout_Exercise` (
  `Workout_id` INT NOT NULL,
  `Exercise_id` INT NOT NULL,
  PRIMARY KEY (`Workout_id`, `Exercise_id`),
  INDEX `fk_Workout_Exercise_1_idx` (`Workout_id` ASC) VISIBLE,
  INDEX `fk_Workout_Exercise_2_idx` (`Exercise_id` ASC) VISIBLE,
  CONSTRAINT `fk_Workout_Exercise_1`
    FOREIGN KEY (`Workout_id`)
    REFERENCES `Workouts` (`id_workout`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Workout_Exercise_2`
    FOREIGN KEY (`Exercise_id`)
    REFERENCES `Exercises` (`id_exercise`));
    
    CREATE TABLE IF NOT EXISTS `muscle_groups` (
  `id_muscle_groups` INT NOT NULL,
  `muscle_group` VARCHAR(20) NOT NULL,
  `img_src` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_muscle_groups`));





