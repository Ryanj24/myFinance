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
    `balance` DECIMAL(10, 2) CHECK(`balance` >= 0),
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
            WHERE `id` = `account_id` AND `account_owner_id` = account_owner_id;

            INSERT INTO `bank_transactions` (account_id, type, category, transaction_date, amount)
            VALUES (account_id, transaction_type, category, transaction_date, amount);
        ELSE
            UPDATE `bank_accounts` SET `balance` = `balance` - amount
            WHERE `id` = `account_id` AND `account_owner_id` = account_owner_id;

            INSERT INTO `bank_transactions` (account_id, type, category, transaction_date, amount)
            VALUES (account_id, transaction_type, category, transaction_date, amount);
        END IF;
    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE stock_transaction_procedure(
    IN id_of_portfolio INT, 
    IN name_of_company VARCHAR(64),
    IN ticker_symbol VARCHAR(4),
    IN purchase_or_sale ENUM("Buy", "Sell"),
    IN date_of_transaction DATE,
    IN quantity_of_shares INT,
    IN price_per_share DECIMAL(8, 2)
    )
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
        IF purchase_or_sale = "Buy" THEN
            UPDATE `stock_portfolio` SET `balance` = `balance` - (quantity_of_shares * price_per_share)
            WHERE `id` = id_of_portfolio;

            IF (SELECT (SELECT COUNT(`company_ticker`) FROM `stock_holdings` WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol)) = 1 THEN
                UPDATE `stock_holdings` SET `quantity` = `quantity` + quantity_of_shares WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol;
            ELSE
                INSERT INTO `stock_holdings` (portfolio_id, company_name, company_ticker, quantity) 
                VALUES (id_of_portfolio, name_of_company, ticker_symbol, quantity_of_shares);
            END IF;


            -- INSERT INTO `stock_transactions` () VALUES (); 
        ELSE
            UPDATE `stock_portfolio` SET `balance` = `balance` + (quantity * price_per_share)
            WHERE `id` = id_of_portfolio;

            UPDATE `stock_holdings` SET `quantity` = `quantity` - VALUES(quantity)
            WHERE `id` = id_of_portfolio AND `company_ticker` = ticker_symbol;
        END IF;
    COMMIT;
END//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE test_procedure(
    IN id INT, 
    IN ticker VARCHAR(4)
    )
BEGIN
    DECLARE testVar INT DEFAULT 0;

    SELECT COUNT(`company_ticker`) INTO testVar FROM `stock_holdings` WHERE `portfolio_id` = id AND `company_ticker` = ticker;


    IF (SELECT testVar) = 1 THEN
        SELECT "1" AS "";
    ELSE
        SELECT "0" AS "";
    END IF;
    -- SELECT testVar;

END//
DELIMITER ;