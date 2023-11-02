CREATE TABLE users (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(20),
    `last_name` VARCHAR(20),
    `email` VARCHAR(32),
    `password` VARCHAR(255),
    `date_of_birth` DATE,
    PRIMARY KEY(`id`)
);

CREATE TABLE bank_accounts (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `account_name` VARCHAR(20),
    `account_number` INT unsigned,
    `balance` DECIMAL(10, 2) CHECK(`balance` >= 0) DEFAULT 0,
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
    `company_name` VARCHAR(64),
    `company_ticker` VARCHAR(4),
    `type` ENUM("Buy", "Sell"),
    `purchase_date` DATE,
    `quantity` INT unsigned CHECK(`quantity` > 0),
    `price_per_share` DECIMAL(8, 2) unsigned CHECK(`price_per_share` > 0),
    `total_amount` DECIMAL(10, 2) unsigned CHECK(`total_amount` >= 0),
    PRIMARY KEY(`id`),
    FOREIGN KEY(`portfolio_id`) REFERENCES `stock_portfolio`(`id`)
);

CREATE TABLE monthly_budgets (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `user_id` INT unsigned,
    `budget_amount` DECIMAL(10, 2) CHECK(`budget_amount` >= 0),
    `month` ENUM("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
    `year` YEAR,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE goals (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `user_id` INT unsigned,
    `goal_name` VARCHAR(64),
    `current_progress` DECIMAL(10, 2),
    `end_goal` DECIMAL(10, 2),
    PRIMARY KEY(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`)
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
    IN share_price DECIMAL(8, 2)
    )
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    SET @sharesCurrentlyHeld = (SELECT COUNT(`company_ticker`) FROM `stock_holdings` WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol);
    SET @currentQuantityOfSharesHeld = (SELECT `quantity` FROM `stock_holdings` WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol);

    START TRANSACTION;
        IF purchase_or_sale = "Buy" THEN
            UPDATE `stock_portfolio` SET `balance` = `balance` - (quantity_of_shares * share_price)
            WHERE `id` = id_of_portfolio;

            IF (SELECT @sharesCurrentlyHeld) = 1 THEN
                UPDATE `stock_holdings` 
                SET `quantity` = `quantity` + quantity_of_shares, `avg_purchase_price` = ROUND((SELECT SUM(`total_amount` + (quantity_of_shares * share_price)) / SUM(`quantity` + quantity_of_shares) FROM `stock_transactions` WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol), 2)
                WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol;
            ELSE
                INSERT INTO `stock_holdings` (portfolio_id, company_name, company_ticker, quantity, avg_purchase_price) 
                VALUES (id_of_portfolio, name_of_company, ticker_symbol, quantity_of_shares, ROUND((quantity_of_shares * share_price) / quantity_of_shares, 2));
            END IF;


            INSERT INTO `stock_transactions` (portfolio_id, company_name, company_ticker, type, purchase_date, quantity, price_per_share, total_amount)
            VALUES (id_of_portfolio, name_of_company, ticker_symbol, "Buy", date_of_transaction, quantity_of_shares, share_price, ROUND(quantity_of_shares * share_price, 2));


        ELSE
            UPDATE `stock_portfolio` SET `balance` = `balance` + (quantity_of_shares * share_price)
            WHERE `id` = id_of_portfolio;

            IF (SELECT @sharesCurrentlyHeld) = 1 AND (SELECT @currentQuantityOfSharesHeld) - quantity_of_shares = 0 THEN
                DELETE FROM `stock_holdings`                
                WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol;      
            ELSE
                UPDATE `stock_holdings` 
                SET `avg_purchase_price` = ROUND(
                    (SELECT (SUM(`total_amount`) - (quantity_of_shares * share_price)) / (SUM(`quantity`) - quantity_of_shares)
                     FROM `stock_transactions` 
                     WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol AND `type` = "Buy"
                    ), 2),
                    `quantity` = `quantity` - quantity_of_shares
                WHERE `portfolio_id` = id_of_portfolio AND `company_ticker` = ticker_symbol;
            END IF;


            INSERT INTO `stock_transactions` (portfolio_id, company_name, company_ticker, type, purchase_date, quantity, price_per_share, total_amount)
            VALUES (id_of_portfolio, name_of_company, ticker_symbol, "Sell", date_of_transaction, quantity_of_shares, share_price, ROUND(quantity_of_shares * share_price, 2));
        END IF;
    COMMIT;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE bank_transfer_procedure(
    IN sender_account_id INT,
    IN receiver_account_id INT,
    IN amount_to_transfer DECIMAL(10, 2),
    IN transaction_date DATE
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
        UPDATE `bank_accounts`
        SET `balance` = `balance` + amount_to_transfer
        WHERE `id` = receiver_account_id;

        UPDATE `bank_accounts`
        SET `balance` = `balance` - amount_to_transfer
        WHERE `id` = sender_account_id;

        INSERT INTO `bank_transactions` (account_id, type, category, transaction_date, amount) 
        VALUES (receiver_account_id, "Deposit", "Personal", transaction_date, amount_to_transfer), (sender_account_id, "Withdrawl", "Personal", transaction_date, amount_to_transfer);
    COMMIT;
END//
DELIMITER ;