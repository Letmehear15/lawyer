<?php
        $to = 'sanya.nesterov666@gmail.com';
        $subject = "Заполнена контактная форма на сайте ";
        if(isset($_POST['name'])) {
                $name = $_POST["name"];
                $phone = $_POST["phone"];
                $message = "Имя пользователя: ".$name."\nТелефон пользователя ".$phone;
                        
                mail($to, $subject, $message);
        }

        if(isset($_POST['ordName'])) {
                $name = $_POST["ordName"];
                $phone = $_POST["ordPhone"];
                $ordMsg = $_POST["ordText"];
                $message = "Имя пользователя: ".$name."\nТелефон пользователя ".$phone."\nOставил сообщение: ".$ordMsg;
                        
                mail($to, $subject, $message);
        }
        
        
?>