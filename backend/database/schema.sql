CREATE TABLE users (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(20),
    `last_name` VARCHAR(20),
    `email` VARCHAR(32),
    `password` VARCHAR(255),
    `date_of_birth` DATE,
    `profile_img` TEXT DEFAULT "/src/assets/user.png",        
    PRIMARY KEY(`id`)
);

CREATE TABLE bank_accounts (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `account_name` VARCHAR(20),
    `account_number` INT unsigned UNIQUE,
    `balance` DECIMAL(10, 2) CHECK(`balance` >= 0) DEFAULT 0,
    `account_provider` ENUM("Barclays", "HSBC", "Lloyds", "Monzo", "NatWest", "Other", "Royal Bank of Scotland", "Santander", "Starling Bank", "Virgin Money")
    `account_owner_id` INT unsigned,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`account_owner_id`) REFERENCES users(`id`)
);

CREATE TABLE stock_portfolio (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `portfolio_name` VARCHAR(64),
    `balance` DECIMAL(10, 2) CHECK(`balance` >= 0) DEFAULT 0,
    `portfolio_owner_id` INT unsigned,
    `provider` VARCHAR(255),
    PRIMARY KEY(`id`),
    FOREIGN KEY(`portfolio_owner_id`) REFERENCES `users`(`id`)
);

CREATE TABLE stock_holdings (
    `portfolio_id` INT unsigned,
    `company_name` VARCHAR(64),
    `company_ticker` VARCHAR(4),
    `quantity` INT unsigned CHECK(`quantity` > 0),
    `logo_src` VARCHAR(255),
    `avg_purchase_price` DECIMAL(6, 2),
    FOREIGN KEY(`portfolio_id`) REFERENCES `stock_portfolio`(`id`)
);

CREATE TABLE bank_transactions (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `account_id` INT unsigned,
    `type` ENUM("Income", "Expense", "Deposit", "Withdrawl"),
    `category` ENUM("Housing", "Transportation", "Food", "Utilities", "Medical & Healthcare", "Personal", "Entertainment", "Other"),
    `description` VARCHAR(255),
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
    `transaction_date` DATE,
    `quantity` INT unsigned CHECK(`quantity` > 0),
    `price_per_share` DECIMAL(8, 2) unsigned CHECK(`price_per_share` > 0),
    `total_amount` DECIMAL(10, 2) unsigned CHECK(`total_amount` >= 0),
    PRIMARY KEY(`id`),
    FOREIGN KEY(`portfolio_id`) REFERENCES `stock_portfolio`(`id`)
);


CREATE TABLE monthly_budgets (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `user_id` INT unsigned,
    `month` ENUM("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
    `year` YEAR,
    `total_budget` DECIMAL(10,2),
    `housing` DECIMAL(10, 2),
    `transportation` DECIMAL(10, 2),
    `food` DECIMAL(10, 2),
    `utilities` DECIMAL(10, 2),
    `medical_healthcare` DECIMAL(10, 2),
    `personal` DECIMAL(10, 2),
    `entertainment` DECIMAL(10, 2),
    `other` DECIMAL(10, 2),
    CHECK (`total_budget` = `housing` + `transportation` + `food` + `utilities` + `medical_healthcare` + `personal` + `entertainment` + `other`),
    PRIMARY KEY(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`)
);


CREATE TABLE goals (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `user_id` INT unsigned,
    `goal_name` VARCHAR(64),
    `goal_desc` TEXT,
    `current_progress` DECIMAL(10, 2) DEFAULT 0,
    `end_goal` DECIMAL(10, 2),
    `end_date` DATE,
    `status` ENUM("Active", "Completed") DEFAULT "Active"
    PRIMARY KEY(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`)
);

DELIMITER //
CREATE PROCEDURE bank_transaction_procedure(
    IN account_id INT, 
    IN transaction_type ENUM("Income", "Expense", "Deposit", "Withdrawl"),
    IN account_owner_id INT,
    IN amount DECIMAL(8, 2),
    IN transaction_desc VARCHAR(255),
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

            INSERT INTO `bank_transactions` (account_id, type, category, description, transaction_date, amount)
            VALUES (account_id, transaction_type, category, transaction_desc, transaction_date, amount);
        ELSE
            UPDATE `bank_accounts` SET `balance` = `balance` - amount
            WHERE `id` = `account_id` AND `account_owner_id` = account_owner_id;

            INSERT INTO `bank_transactions` (account_id, type, category, description, transaction_date, amount)
            VALUES (account_id, transaction_type, category, transaction_desc, transaction_date, amount);
        END IF;
    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE update_bank_transaction_procedure(
    IN account_id INT, 
    IN transaction_id INT,
    IN transaction_type ENUM("Income", "Expense", "Deposit", "Withdrawl"),
    IN old_amount DECIMAL(8, 2),
    IN oldAmountHigher BOOLEAN,
    IN typeChange BOOLEAN,
    IN amount DECIMAL(8, 2),
    IN transaction_desc VARCHAR(255),
    IN category VARCHAR(20),
    IN transaction_date DATE)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
        IF (transaction_type = "Income" OR transaction_type = "Deposit") AND typeChange THEN
            UPDATE `bank_accounts` SET `balance` = `balance` + old_amount + amount
            WHERE `id` = account_id;

            UPDATE `bank_transactions`
            SET `type` = transaction_type, `category` = category, `description` = transaction_desc, `transaction_date` = transaction_date, `amount` = amount
            WHERE `id` = transaction_id AND `account_id` = account_id;


        ELSEIF (transaction_type = "Income" OR transaction_type = "Deposit") AND NOT typeChange THEN
            IF oldAmountHigher = TRUE THEN
                UPDATE `bank_accounts` SET `balance` = `balance` - (old_amount - amount)
                WHERE `id` = account_id;

                UPDATE `bank_transactions`
                SET `type` = transaction_type, `category` = category, `description` = transaction_desc, `transaction_date` = transaction_date, `amount` = amount
                WHERE `id` = transaction_id AND `account_id` = account_id;
            ELSE 
                UPDATE `bank_accounts` SET `balance` = `balance` + (amount - old_amount)
                WHERE `id` = account_id;

                UPDATE `bank_transactions`
                SET `type` = transaction_type, `category` = category, `description` = transaction_desc, `transaction_date` = transaction_date, `amount` = amount
                WHERE `id` = transaction_id AND `account_id` = account_id;
            END IF;


        ELSEIF (transaction_type = "Expense" OR transaction_type = "Withdrawl") AND typeChange THEN
            UPDATE `bank_accounts` SET `balance` = `balance` - old_amount - amount
            WHERE `id` = account_id;

            UPDATE `bank_transactions`
            SET `type` = transaction_type, `category` = category, `description` = transaction_desc, `transaction_date` = transaction_date, `amount` = amount
            WHERE `id` = transaction_id AND `account_id` = account_id;


        ELSEIF (transaction_type = "Expense" OR transaction_type = "Withdrawl") AND NOT typeChange THEN

            IF oldAmountHigher = TRUE THEN
                UPDATE `bank_accounts` SET `balance` = `balance` + (old_amount - amount)
                WHERE `id` = account_id;

                UPDATE `bank_transactions`
                SET `type` = transaction_type, `category` = category, `description` = transaction_desc, `transaction_date` = transaction_date, `amount` = amount
                WHERE `id` = transaction_id AND `account_id` = account_id;
            ELSE 
                UPDATE `bank_accounts` SET `balance` = `balance` - (amount - old_amount)
                WHERE `id` = account_id;

                UPDATE `bank_transactions`
                SET `type` = transaction_type, `category` = category, `description` = transaction_desc, `transaction_date` = transaction_date, `amount` = amount
                WHERE `id` = transaction_id AND `account_id` = account_id;
            END IF;
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
    IN company_logo_src VARCHAR(255),
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
                INSERT INTO `stock_holdings` (portfolio_id, company_name, company_ticker, quantity, logo_src, avg_purchase_price) 
                VALUES (id_of_portfolio, name_of_company, ticker_symbol, quantity_of_shares, company_logo_src, ROUND((quantity_of_shares * share_price) / quantity_of_shares, 2));
            END IF;


            INSERT INTO `stock_transactions` (portfolio_id, company_name, company_ticker, type, transaction_date, quantity, price_per_share, total_amount)
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


            INSERT INTO `stock_transactions` (portfolio_id, company_name, company_ticker, type, transaction_date, quantity, price_per_share, total_amount)
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

DELIMITER //
CREATE PROCEDURE update_goal_progress_procedure(
    IN user_id INT,
    IN goal_id INT,
    IN new_progress_amount DECIMAL(10, 2)
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    SET @endGoalAmount = (SELECT `end_goal` FROM `goals` WHERE `id` = goal_id AND `user_id` = user_id);
    SET @currentGoalAmount = (SELECT `current_progress` FROM `goals` WHERE `id` = goal_id AND `user_id` = user_id);
    SET @currentGoalStatus = (SELECT `status` FROM `goals` WHERE `id` = goal_id AND `user_id` = user_id);

    IF new_progress_amount = (SELECT @endGoalAmount) THEN
        UPDATE `goals` SET `current_progress` = new_progress_amount, `status` = "Completed" WHERE `id` = goal_id AND `user_id` = user_id;
    ELSEIF new_progress_amount < (SELECT @endGoalAmount) AND (SELECT @currentGoalStatus) = "Completed" THEN
        UPDATE `goals` SET `current_progress` = new_progress_amount, `status` = "Active" WHERE `id` = goal_id AND `user_id` = user_id;
    ELSE
        UPDATE `goals` SET `current_progress` = new_progress_amount WHERE `id` = goal_id AND `user_id` = user_id;
    END IF;

END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER deleteBankAccount
BEFORE DELETE ON bank_accounts
FOR EACH ROW
BEGIN
    DELETE FROM `bank_transactions` WHERE `account_id` = OLD.id;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER deletePortfolio
BEFORE DELETE ON stock_portfolio
FOR EACH ROW
BEGIN
    DELETE FROM `stock_holdings` WHERE `portfolio_id` = OLD.id;
    DELETE FROM `stock_transactions` WHERE `portfolio_id` = OLD.id;
END//
DELIMITER ;