-- Table `Users`
CREATE TABLE IF NOT EXISTS `Users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  `Email` VARCHAR(50) NULL,
  `Password` VARCHAR(100) NULL,
  `Role` VARCHAR(10) NULL,
  `level` VARCHAR(20) NULL,
  `Weight` INT NULL,
  `Height` INT NULL,
  `avatar` VARCHAR(100) NULL,
  `Status` VARCHAR(10) NULL,
  PRIMARY KEY (`id_user`)
) ENGINE = InnoDB;

-- Table `Workouts`
CREATE TABLE IF NOT EXISTS `Workouts` (
  `id_workout` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(20) NULL,
  `Date` DATE NULL,
  `Users_id_user` INT NOT NULL,
  PRIMARY KEY (`id_workout`),
  INDEX `fk_Workouts_Users_idx` (`Users_id_user` ASC),
  CONSTRAINT `fk_Workouts_Users`
    FOREIGN KEY (`Users_id_user`)
    REFERENCES `Users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Table `Exercises`
CREATE TABLE IF NOT EXISTS `Exercises` (
  `id_exercise` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(20) NULL,
  `Muscle_group` VARCHAR(45) NULL,
  PRIMARY KEY (`id_exercise`)
) ENGINE = InnoDB;

-- Table `Sets`
CREATE TABLE IF NOT EXISTS `Sets` (
  `id_set` INT NOT NULL AUTO_INCREMENT,
  `Exercise_id` INT NOT NULL,
  `Repetitions` INT NULL,
  `Weight` INT NULL,
  PRIMARY KEY (`id_set`),
  INDEX `fk_Sets_Exercises_idx` (`Exercise_id` ASC),
  CONSTRAINT `fk_Sets_Exercises`
    FOREIGN KEY (`Exercise_id`)
    REFERENCES `Exercises` (`id_exercise`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Table `Workout_Exercise`
CREATE TABLE IF NOT EXISTS `Workout_Exercise` (
  `Workout_id` INT NOT NULL,
  `Exercise_id` INT NOT NULL,
  PRIMARY KEY (`Workout_id`, `Exercise_id`),
  INDEX `fk_Workout_Exercise_1_idx` (`Workout_id` ASC),
  INDEX `fk_Workout_Exercise_2_idx` (`Exercise_id` ASC),
  CONSTRAINT `fk_Workout_Exercise_1`
    FOREIGN KEY (`Workout_id`)
    REFERENCES `Workouts` (`id_workout`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Workout_Exercise_2`
    FOREIGN KEY (`Exercise_id`)
    REFERENCES `Exercises` (`id_exercise`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;