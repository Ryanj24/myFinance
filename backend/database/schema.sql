CREATE TABLE users (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(20),
    `last_name` VARCHAR(20),
    `email` VARCHAR(32),
    `password` VARCHAR(32),
    `date_of_birth` DATE,
    PRIMARY KEY(`id`)
);

CREATE TABLE bank_accounts (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `account_name` VARCHAR(20),
    `balance` DECIMAL(10, 2) CHECK(`balance` >= 0),
    `account_owner_id` INT unsigned,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`account_owner_id`) REFERENCES users(`id`)
);

CREATE TABLE stock_portfolio (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `portfolio_name` VARCHAR(20),
    `balance` DECIMAL(10, 2),
    `portfolio_owner_id` INT unsigned,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`portfolio_owner_id`) REFERENCES `users`(`id`)
);

CREATE TABLE stock_holdings (
    `portfolio_id` INT unsigned,
    `company_name` VARCHAR(64),
    `company_ticker` VARCHAR(4),
    `quantity` INT unsigned CHECK(`quantity` > 0),
    `avg_purchase_price` DECIMAL(6, 2),
    FOREIGN KEY(`portfolio_id`) REFERENCES `stock_portfolio`(`id`)
);

CREATE TABLE bank_transactions (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `account_id` INT unsigned,
    `type` ENUM("Income", "Expense", "Deposit", "Withdrawl"),
    `category` ENUM("Housing", "Transportation", "Food", "Utilities", "Medical & Healthcare", "Personal", "Entertainment", "Other"),
    `transaction_date` DATE,
    `amount` DECIMAL(7, 2) CHECK(`amount` >= 0),
    PRIMARY KEY(`id`),
    FOREIGN KEY(`account_id`) REFERENCES `bank_accounts`(`id`)
);

CREATE TABLE stock_transactions (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `portfolio_id` INT unsigned,
    `company_ticker` VARCHAR(4),
    `type` ENUM("Buy", "Sell"),
    `purchase_date` DATE,
    `quantity` INT unsigned CHECK(`quantity` > 0),
    `price_per_share` DECIMAL(8, 2) unsigned CHECK(`price_per_share` > 0),
    `total_amount` DECIMAL(10, 2) unsigned CHECK(`total_amount` >= 0),
    PRIMARY KEY(`id`),
    FOREIGN KEY(`portfolio_id`) REFERENCES `stock_portfolio`(`id`)
);

DELIMITER //
CREATE PROCEDURE bank_transaction_procedure(
    IN account_id INT, 
    IN transaction_type ENUM("Income", "Expense", "Deposit", "Withdrawl"),
    IN account_owner_id INT,
    IN amount DECIMAL(8, 2),
    IN category VARCHAR(20),
    IN transaction_date DATE)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
        IF transaction_type = "Income" OR transaction_type = "Deposit" THEN
            UPDATE `bank_accounts` SET `balance` = `balance` + amount
            WHERE `account_id` = account_id;

            INSERT INTO `bank_transactions` (account_id, type, category, transaction_date, amount)
            VALUES (account_id, transaction_type, category, transaction_date, amount);
        ELSE
            UPDATE `bank_accounts` SET `balance` = `balance` - amount
            WHERE `account_id` = account_id;

            INSERT INTO `bank_transactions` (account_id, type, category, transaction_date, amount)
            VALUES (account_id, transaction_type, category, transaction_date, amount);
        END IF;
    COMMIT;
END//
DELIMITER ;

-- DELIMITER //
-- CREATE PROCEDURE stock_transaction_procedure(
--     IN portfolio_id INT,
--     IN portfolio_owner_id INT,
--     IN transaction_type ENUM("Buy", "Sell"),
--     IN company_ticker VARCHAR(4),
--     IN price_per_share DECIMAL(8, 2),
--     IN quantity INT,
--     IN transaction_date DATE
-- )
-- BEGIN
--     IF transaction_type = "Buy" THEN

--     END IF;
-- END//
-- DELIMITER ;
